import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getExchangeReport } from './apis/exchange-rate/index.js';
import { getNewsAnalysis, getLiveHeadlines } from './apis/news/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/report', async (req, res) => {
  try {
    const [rate, news, headlines] = await Promise.all([
      getExchangeReport(process.env.EXIM_API_KEY),
      getNewsAnalysis(),
      getLiveHeadlines(process.env.FINNHUB_API_KEY).catch(() => []),
    ]);
    res.json({ rate, news, headlines });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`환율봇 서버 실행 중: http://localhost:${PORT}`);
});
