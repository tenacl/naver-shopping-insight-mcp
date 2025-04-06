import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

// 서버 인스턴스 생성
const server = createServer();

// stdio 트랜스포트 생성 및 연결
const transport = new StdioServerTransport();

// 서버 시작
async function startServer() {
  try {
    console.error("네이버 쇼핑인사이트 MCP 서버 시작 중...");
    await server.connect(transport);
    console.error("네이버 쇼핑인사이트 MCP 서버가 성공적으로 시작되었습니다.");
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
    process.exit(1);
  }
}

startServer(); 