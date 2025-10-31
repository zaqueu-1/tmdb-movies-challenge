import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface LazyImageProps {
    src: string;
    alt: string;
    fallback?: string;
    aspectRatio?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    className?: string;
}

export function LazyImage({
    src,
    alt,
    fallback,
    aspectRatio = '2/3',
    objectFit = 'cover',
    className,
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '50px',
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setIsLoaded(true);
    };

    const imageSrc = error && fallback ? fallback : src;

    return (
        <div
            className={cn('relative overflow-hidden bg-muted', className)}
            style={{ aspectRatio }}
        >
            {!isLoaded && (
                <div className="absolute inset-0 skeleton" />
            )}

            <motion.img
                ref={imgRef}
                src={isInView ? imageSrc : undefined}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.1
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                    'w-full h-full',
                    {
                        'object-contain': objectFit === 'contain',
                        'object-cover': objectFit === 'cover',
                        'object-fill': objectFit === 'fill',
                        'object-none': objectFit === 'none',
                        'object-scale-down': objectFit === 'scale-down',
                    }
                )}
            />
        </div>
    );
}

