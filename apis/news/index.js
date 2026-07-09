import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ANALYSIS_PATH = path.join(__dirname, 'analysis.json');

// Curated Korean translation/analysis, written by hand (see analysis.json).
// Finnhub 뉴스 원문은 영어라 자동 번역 API 없이는 매번 새로 옮겨야 하므로,
// 이 파일은 스냅샷을 서빙하고 최신화가 필요하면 analysis.json을 갱신한다.
export async function getNewsAnalysis() {
  const raw = await readFile(ANALYSIS_PATH, 'utf-8');
  return JSON.parse(raw);
}

// 참고용 원문 헤드라인 (영어, 번역되지 않은 실시간 데이터).
export async function getLiveHeadlines(apiKey, limit = 10) {
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const list = await res.json();
  if (!Array.isArray(list)) return [];
  return list.slice(0, limit).map((item) => ({
    headline: item.headline,
    source: item.source,
    datetime: item.datetime,
    url: item.url,
  }));
}
