/**
 * 日付をフォーマットする
 * @param date 日付
 * @returns フォーマットされた日付
 */
export function formatDate(date: Date): string {
  // 2ケタになるようにゼロ埋め
  const padZero = (num: number) => num.toString().padStart(2, "0");

  return `${date.getFullYear()}/${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`;
}
