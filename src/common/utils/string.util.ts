import { genSaltSync, hashSync, compare as toCompare } from 'bcrypt';

export class StringUtils {
  /**
   *
   * @param text
   * @returns
   */
  public static hash(text: string): string {
    const SALT_ROUND = 10;
    const salt = genSaltSync(SALT_ROUND);
    const hash = hashSync(text, salt);

    return hash;
  }

  /**
   *
   * @param hashString
   * @param text
   * @returns
   */
  public static async compare(hashString: string, text: string): Promise<boolean> {
    const isMatch = await toCompare(text, hashString);
    return isMatch;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static randomNumber(length: number): string {
    let num = '';
    for (let i = 0; i < length; i++) {
      num = num + Math.floor(Math.random() * (9 - 1 + 1) + 1);
    }

    return num;
  }
}
