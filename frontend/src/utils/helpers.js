export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }
  return timeString;
};

export const getBadgeColorClass = (trustTier) => {
  switch (trustTier?.toLowerCase()) {
    case 'gold tier':
    case 'gold':
      return 'gold';
    case 'silver tier':
    case 'silver':
      return 'silver';
    case 'bronze tier':
    case 'bronze':
      return 'bronze';
    default:
      return 'silver';
  }
};
