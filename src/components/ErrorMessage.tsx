import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">{t('common.error')}</h3>
      <p className="text-gray-400 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  );  
}


