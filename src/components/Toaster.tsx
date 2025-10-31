import { Toaster as Sonner } from 'sonner';
import { useTheme } from '../hooks/useTheme';

export function Toaster() {
  const { effectiveTheme } = useTheme();

  return (
    <Sonner
      theme={effectiveTheme}
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'glass-card',
          title: 'text-sm font-semibold',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          closeButton: 'bg-muted text-muted-foreground hover:bg-muted/80',
        },
      }}
      richColors
      closeButton
    />
  );
}


