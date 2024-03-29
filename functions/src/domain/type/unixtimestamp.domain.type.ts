import * as admin from 'firebase-admin';

export default class UnixTimeStamp {
  private static readonly DIVIDE = 1000;
  /**
   * コンストラクタ
   *
   * @param {number} value
   */
  constructor(readonly value: number) {}

  /**
   * ファクトリメソッド
   *
   * @param {admin.firestore.Timestamp} timestamp firebaseのTimestamp型
   * @return {UnixTimeStamp} 型クラス
   */
  static from(timestamp: admin.firestore.Timestamp): UnixTimeStamp {
    return new UnixTimeStamp(timestamp.toDate().getTime() / this.DIVIDE);
  }
}
