import type { Request, Response, NextFunction } from 'express';
import { TMDBServiceError } from '../services/tmdb.service.js';

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error('Error:', error);

    if (error instanceof TMDBServiceError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
    });
}

