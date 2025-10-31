
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return '';
  
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatCurrencyUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatRuntime(minutes: number): string {
  if (!minutes || minutes <= 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}min`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

