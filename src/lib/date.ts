/**
 * 日付をフォーマットする
 * @param date 日付
 * @param dateOnly 日付のみにするかどうか
 * @returns フォーマットされた日付
 */
export function formatDate(rawDate: string, dateOnly = false): string {
  // 2ケタになるようにゼロ埋め
  const padZero = (num: number) => num.toString().padStart(2, "0");

  const publishDate = new Date(rawDate);

  const date = `${publishDate.getFullYear()}/${padZero(publishDate.getMonth() + 1)}/${padZero(publishDate.getDate())}`;

  return dateOnly
    ? date
    : `${date} ${padZero(publishDate.getHours())}:${padZero(publishDate.getMinutes())}`;
}
