export class DateUtils {
  /**
   *
   * @param date
   * @returns
   */
  public static toUnix = (date: Date): number => {
    return Math.round(date.getTime() / 1000);
  };
}
