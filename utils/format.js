export function formatDate(dateStr) {
  return dateStr.split('T')[0].replace(/-/g, '/');
}