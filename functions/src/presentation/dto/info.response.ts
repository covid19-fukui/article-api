import { ApiProperty } from '@nestjs/swagger';
import Now from '../../domain/type/now.domain.type';

/**
 * info情報
 */
export default class InfoResponse {
  @ApiProperty({
    example: '2021-06-11T21:18:36+09:00',
    description: 'リクエスト日時',
  })
  readonly datetime: string;

  /**
   * コンストラクタ
   *
   * @param {string} datetime
   */
  constructor(datetime: string) {
    this.datetime = datetime;
  }

  /**
   * ファクトリメソッド
   *
   * @param {Now} datetime
   * @return {InfoResponse} API情報のレスポンス
   */
  static from(datetime: Now): InfoResponse {
    return new InfoResponse(datetime.value);
  }
}
