/**
 * 判断是否是mac环境
 */

export function isMac(): boolean {
  return /mac/i.test(navigator.userAgent);
}
export function isWin(): boolean {
  return /windows/i.test(navigator.userAgent);
}