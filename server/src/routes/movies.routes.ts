import { Router, type Request, type Response, type NextFunction } from 'express';
import { tmdbService } from '../services/tmdb.service.js';

const router = Router();

router.get('/popular', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const data = await tmdbService.getPopularMovies(page);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query.q as string;
        const page = parseInt(req.query.page as string) || 1;

        if (!query) {
            res.status(400).json({
                success: false,
                message: 'Parâmetro "q" é obrigatório',
            });
            return;
        }

        const data = await tmdbService.searchMovies(query, page);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movieId = parseInt(req.params.id);

        if (isNaN(movieId)) {
            res.status(400).json({
                success: false,
                message: 'ID do filme inválido',
            });
            return;
        }

        const data = await tmdbService.getMovieDetails(movieId);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

export default router;

