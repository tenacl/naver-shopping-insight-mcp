import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { 
  NaverShoppingInsightClient, 
  CategoryRequestSchema, 
  KeywordRequestSchema, 
  ShoppingInsightResponse 
} from "./naverClient.js";

// 네이버 쇼핑인사이트 클라이언트 생성
const naverClient = new NaverShoppingInsightClient();

// MCP 서버 생성
export const createServer = () => {
  const server = new McpServer({
    name: "네이버 쇼핑인사이트",
    version: "1.0.0"
  });

  // 카테고리 리소스: 분야별 트렌드 정보 제공
  server.resource(
    "categories",
    new ResourceTemplate("naver-shopping-insight://categories/{startDate}/{endDate}/{timeUnit}", { list: undefined }),
    async (uri, { startDate, endDate, timeUnit }) => {
      try {
        const request = {
          startDate: String(startDate),
          endDate: String(endDate),
          timeUnit: String(timeUnit) as "date" | "week" | "month",
          category: [
            { name: "패션의류", param: ["50000000"] },
            { name: "화장품/미용", param: ["50000002"] }
          ]
        };

        const response = await naverClient.getCategories(request);
        return {
          contents: [{
            uri: uri.href,
            text: formatResponseAsText(response)
          }]
        };
      } catch (error: any) {
        return {
          contents: [{
            uri: uri.href,
            text: `오류 발생: ${error.message}`
          }]
        };
      }
    }
  );

  // 카테고리 트렌드 조회 도구
  server.tool(
    "get-category-trends",
    {
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      timeUnit: z.enum(["date", "week", "month"]),
      categories: z.array(
        z.object({
          name: z.string(),
          param: z.array(z.string())
        })
      ),
      device: z.enum(["pc", "mobile", "all"]).optional(),
      gender: z.enum(["m", "f", "a"]).optional(),
      ages: z.array(z.enum(["10", "20", "30", "40", "50", "60"])).optional()
    },
    async ({ startDate, endDate, timeUnit, categories, device, gender, ages }) => {
      try {
        const request = {
          startDate,
          endDate,
          timeUnit,
          category: categories,
          device,
          gender,
          ages
        };

        const response = await naverClient.getCategories(request);
        return {
          content: [{ type: "text", text: formatResponseAsText(response) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `오류 발생: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // 카테고리 기기별 트렌드 조회 도구
  server.tool(
    "get-category-by-device",
    {
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      timeUnit: z.enum(["date", "week", "month"]),
      categories: z.array(
        z.object({
          name: z.string(),
          param: z.array(z.string())
        })
      )
    },
    async ({ startDate, endDate, timeUnit, categories }) => {
      try {
        const request = {
          startDate,
          endDate,
          timeUnit,
          category: categories
        };

        const response = await naverClient.getCategoryByDevice(request);
        return {
          content: [{ type: "text", text: formatResponseAsText(response) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `오류 발생: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // 카테고리 성별 트렌드 조회 도구
  server.tool(
    "get-category-by-gender",
    {
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      timeUnit: z.enum(["date", "week", "month"]),
      categories: z.array(
        z.object({
          name: z.string(),
          param: z.array(z.string())
        })
      )
    },
    async ({ startDate, endDate, timeUnit, categories }) => {
      try {
        const request = {
          startDate,
          endDate,
          timeUnit,
          category: categories
        };

        const response = await naverClient.getCategoryByGender(request);
        return {
          content: [{ type: "text", text: formatResponseAsText(response) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `오류 발생: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // 카테고리 연령별 트렌드 조회 도구
  server.tool(
    "get-category-by-age",
    {
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      timeUnit: z.enum(["date", "week", "month"]),
      categories: z.array(
        z.object({
          name: z.string(),
          param: z.array(z.string())
        })
      )
    },
    async ({ startDate, endDate, timeUnit, categories }) => {
      try {
        const request = {
          startDate,
          endDate,
          timeUnit,
          category: categories
        };

        const response = await naverClient.getCategoryByAge(request);
        return {
          content: [{ type: "text", text: formatResponseAsText(response) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `오류 발생: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // 키워드 트렌드 조회 도구
  server.tool(
    "get-keyword-trends",
    {
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      timeUnit: z.enum(["date", "week", "month"]),
      category: z.string(),
      keywords: z.array(
        z.object({
          name: z.string(),
          param: z.array(z.string())
        })
      ),
      device: z.enum(["pc", "mobile", "all"]).optional(),
      gender: z.enum(["m", "f", "a"]).optional(),
      ages: z.array(z.enum(["10", "20", "30", "40", "50", "60"])).optional()
    },
    async ({ startDate, endDate, timeUnit, category, keywords, device, gender, ages }) => {
      try {
        const request = {
          startDate,
          endDate,
          timeUnit,
          category,
          keyword: keywords,
          device,
          gender,
          ages
        };

        const response = await naverClient.getKeywords(request);
        return {
          content: [{ type: "text", text: formatResponseAsText(response) }]
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `오류 발생: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // 프롬프트 추가
  server.prompt(
    "shopping-insight-guide",
    { },
    () => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `네이버 쇼핑인사이트 API를 통해 다음과 같은 정보를 조회할 수 있습니다:

1. 쇼핑인사이트 분야별 트렌드 조회
2. 쇼핑인사이트 분야 내 기기별 트렌드 조회
3. 쇼핑인사이트 분야 내 성별 트렌드 조회
4. 쇼핑인사이트 분야 내 연령별 트렌드 조회
5. 쇼핑인사이트 키워드별 트렌드 조회

다음 도구들을 사용할 수 있습니다:
- get-category-trends: 분야별 트렌드 조회
- get-category-by-device: 기기별 트렌드 조회
- get-category-by-gender: 성별 트렌드 조회
- get-category-by-age: 연령별 트렌드 조회
- get-keyword-trends: 키워드별 트렌드 조회

요청 예시:
1. 2023년 1월부터 2023년 3월까지 패션의류와 화장품/미용 분야의 월별 트렌드
2. 특정 키워드(예: "니트", "립스틱")의 트렌드 
3. 20-30대 여성의 화장품 관련 트렌드

주요 카테고리 ID:
- 패션의류: 50000000
- 화장품/미용: 50000002
- 디지털/가전: 50000003
- 식품: 50000008
`
        }
      }]
    })
  );

  return server;
};

// 응답을 텍스트로 포맷팅하는 유틸리티 함수
function formatResponseAsText(response: ShoppingInsightResponse): string {
  let text = `[네이버 쇼핑인사이트 분석 결과]\n`;
  text += `조회 기간: ${response.startDate} ~ ${response.endDate}\n`;
  text += `시간 단위: ${response.timeUnit}\n\n`;

  for (const result of response.results) {
    text += `항목: ${result.title}\n`;
    
    if (result.category) {
      text += `카테고리: ${result.category.join(', ')}\n`;
    }
    
    if (result.keyword) {
      text += `키워드: ${result.keyword.join(', ')}\n`;
    }
    
    text += '데이터:\n';
    for (const point of result.data) {
      text += `  - ${point.period}: ${point.ratio.toFixed(2)}\n`;
    }
    text += '\n';
  }

  return text;
} 