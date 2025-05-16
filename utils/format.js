/**
 * 日期格式轉換
 * @param {*} dateStr 
 * @returns 
 */
export function formatDate(dateStr) {
  return dateStr.split('T')[0].replace(/-/g, '/');
}

/**
 * 匯率計算
 * @param {*} rate 
 * @param {*} margin 
 * @returns 
 */
export function calculateFinalRate(rate, margin) {
  const finalRate = rate * (1 - margin);
  return Math.floor(finalRate * 100) / 100;
};
