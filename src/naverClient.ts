import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

// 환경 변수에서 API 키 가져오기
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// API 엔드포인트
const API_BASE_URL = 'https://openapi.naver.com/v1/datalab/shopping';

// 요청 스키마 정의
export const CategoryRequestSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeUnit: z.enum(['date', 'week', 'month']),
  category: z.array(
    z.object({
      name: z.string(),
      param: z.array(z.string())
    })
  ),
  device: z.enum(['pc', 'mobile', 'all']).optional(),
  gender: z.enum(['m', 'f', 'a']).optional(),
  ages: z.array(z.enum(['10', '20', '30', '40', '50', '60'])).optional()
});

export const KeywordRequestSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeUnit: z.enum(['date', 'week', 'month']),
  category: z.string(),
  keyword: z.array(
    z.object({
      name: z.string(),
      param: z.array(z.string())
    })
  ),
  device: z.enum(['pc', 'mobile', 'all']).optional(),
  gender: z.enum(['m', 'f', 'a']).optional(),
  ages: z.array(z.enum(['10', '20', '30', '40', '50', '60'])).optional()
});

// 응답 타입 정의
export interface DataPoint {
  period: string;
  ratio: number;
}

export interface Result {
  title: string;
  category?: string[];
  keyword?: string[];
  data: DataPoint[];
}

export interface ShoppingInsightResponse {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: Result[];
}

// 요청 타입 정의
export type CategoryRequest = z.infer<typeof CategoryRequestSchema>;
export type KeywordRequest = z.infer<typeof KeywordRequestSchema>;

// 네이버 클라이언트 클래스
export class NaverShoppingInsightClient {
  private headers: Record<string, string>;

  constructor() {
    if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
      throw new Error('네이버 API 인증 정보가 없습니다. 환경 변수를 확인해주세요.');
    }

    this.headers = {
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      'Content-Type': 'application/json'
    };
  }

  /**
   * 쇼핑인사이트 분야별 트렌드 조회
   */
  public async getCategories(request: CategoryRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<CategoryRequest, ShoppingInsightResponse>('/categories', request);
  }

  /**
   * 쇼핑인사이트 분야 내 기기별 트렌드 조회
   */
  public async getCategoryByDevice(request: CategoryRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<CategoryRequest, ShoppingInsightResponse>('/category/device', request);
  }

  /**
   * 쇼핑인사이트 분야 내 성별 트렌드 조회
   */
  public async getCategoryByGender(request: CategoryRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<CategoryRequest, ShoppingInsightResponse>('/category/gender', request);
  }

  /**
   * 쇼핑인사이트 분야 내 연령별 트렌드 조회
   */
  public async getCategoryByAge(request: CategoryRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<CategoryRequest, ShoppingInsightResponse>('/category/age', request);
  }

  /**
   * 쇼핑인사이트 키워드별 트렌드 조회
   */
  public async getKeywords(request: KeywordRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<KeywordRequest, ShoppingInsightResponse>('/category/keywords', request);
  }

  /**
   * 쇼핑인사이트 키워드 기기별 트렌드 조회
   */
  public async getKeywordByDevice(request: KeywordRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<KeywordRequest, ShoppingInsightResponse>('/category/keyword/device', request);
  }

  /**
   * 쇼핑인사이트 키워드 성별 트렌드 조회
   */
  public async getKeywordByGender(request: KeywordRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<KeywordRequest, ShoppingInsightResponse>('/category/keyword/gender', request);
  }

  /**
   * 쇼핑인사이트 키워드 연령별 트렌드 조회
   */
  public async getKeywordByAge(request: KeywordRequest): Promise<ShoppingInsightResponse> {
    return this.sendRequest<KeywordRequest, ShoppingInsightResponse>('/category/keyword/age', request);
  }

  /**
   * API 요청 공통 메서드
   */
  private async sendRequest<T, R>(endpoint: string, body: T): Promise<R> {
    try {
      const response: AxiosResponse<R> = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        body,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`네이버 API 오류: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw new Error(`네이버 API 요청 중 오류 발생: ${error.message}`);
    }
  }
} 