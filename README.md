# 네이버 쇼핑인사이트 MCP 서버

네이버 쇼핑인사이트 API를 사용하여 쇼핑 트렌드 데이터를 MCP(Model Context Protocol) 형식으로 제공하는 서버입니다.

## 기능

- 쇼핑인사이트 분야별 트렌드 조회
- 쇼핑인사이트 분야 내 기기별 트렌드 조회
- 쇼핑인사이트 분야 내 성별 트렌드 조회
- 쇼핑인사이트 분야 내 연령별 트렌드 조회
- 쇼핑인사이트 키워드별 트렌드 조회

## 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/naver-shopping-insight-mcp.git
cd naver-shopping-insight-mcp

# 의존성 설치
npm install

# 빌드
npm run build
```

## 설정

1. 네이버 개발자 센터(https://developers.naver.com)에서 애플리케이션을 등록하고 클라이언트 아이디와 시크릿을 발급받으세요.
2. `MCP.json` 파일에 발급받은 클라이언트 아이디와 시크릿을 입력하세요:

```json
{
  "mcpServers": {
    "naver-shopping-insight": {
      "command": "node",
      "args": [
        "dist/index.js"
      ],
      "env": {
        "NAVER_CLIENT_ID": "YOUR-CLIENT-ID",
        "NAVER_CLIENT_SECRET": "YOUR-CLIENT-SECRET"
      }
    }
  }
}
```

## 사용 방법

### 직접 실행

```bash
npm start
```

### MCP 클라이언트에서 사용

1. MCP 클라이언트 설정에 다음 내용을 추가하세요:

```json
{
  "mcpServers": {
    "naver-shopping-insight": {
      "command": "node",
      "args": [
        "path/to/naver-shopping-insight-mcp/dist/index.js"
      ],
      "env": {
        "NAVER_CLIENT_ID": "YOUR-CLIENT-ID",
        "NAVER_CLIENT_SECRET": "YOUR-CLIENT-SECRET"
      }
    }
  }
}
```

2. MCP 클라이언트에서 다음 도구들을 사용할 수 있습니다:
   - `get-category-trends`: 분야별 트렌드 조회
   - `get-category-by-device`: 기기별 트렌드 조회
   - `get-category-by-gender`: 성별 트렌드 조회
   - `get-category-by-age`: 연령별 트렌드 조회
   - `get-keyword-trends`: 키워드별 트렌드 조회

## 주요 카테고리 ID

- 패션의류: 50000000
- 화장품/미용: 50000002
- 디지털/가전: 50000003
- 식품: 50000008

## 라이선스

ISC

## 참고 자료

- [네이버 데이터랩 API 문서](https://developers.naver.com/docs/datalab/shopping/)
- [Model Context Protocol](https://modelcontextprotocol.io) 