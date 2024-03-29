import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../advice/http.exception.filter';
import {
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import ArticleListApiResponse from '../dto/article.list.api.response';
import ArticleService from '../../application/service/article.service';
import ArticleQuery from '../dto/article.query';
import ArticleErrorResponse from '../dto/article.error.response';
import Now from '../../domain/type/now.domain.type';
import Count from '../../domain/model/count.domain.model';

/**
 * コントローラ
 */
@Controller('api/v1/article')
@ApiTags('api/v1/article')
@UseFilters(HttpExceptionFilter)
export default class ArticleController {
  /**
   * コンストラクタ
   *
   * @param {ArticleService} vaccineService サービス
   */
  constructor(private readonly vaccineService: ArticleService) {}

  /**
   * 記事の検索
   *
   * @param {ArticleQuery} query パラメータ
   * @returns {Promise<ArticleListApiResponse>} 記事のレスポンス
   */
  @Get('search')
  @ApiOkResponse({
    status: 200,
    description: '記事の取得が成功した場合、レスポンスとして返す',
    type: ArticleListApiResponse,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: '記事の取得が失敗した場合、エラーレスポンスとして返す',
    type: ArticleErrorResponse,
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description:
      'get以外のHTTPメソッドでアクセスされた場合、エラーレスポンスとして返す',
    type: ArticleErrorResponse,
  })
  async getArticles(
    @Query() query: ArticleQuery,
  ): Promise<ArticleListApiResponse> {
    const now = Now.new();

    const articles = await this.vaccineService.findArticles(
      Count.of(query.count),
    );

    return ArticleListApiResponse.of(now, articles);
  }
}
