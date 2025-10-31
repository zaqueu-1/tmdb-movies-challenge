interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Loading({ size = 'medium', className = '' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Carregando"
      />
    </div>
  );
}


