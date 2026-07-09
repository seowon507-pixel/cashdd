const EXIM_URL = 'https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON';

function toYyyyMmDd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

async function fetchRateForDate(date, apiKey) {
  const searchdate = toYyyyMmDd(date);
  const url = `${EXIM_URL}?authkey=${apiKey}&searchdate=${searchdate}&data=AP01`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const list = await res.json();
  if (!Array.isArray(list) || list.length === 0) return null;
  const usd = list.find((item) => item.cur_unit === 'USD');
  if (!usd || usd.result !== 1) return null;
  const rate = parseFloat(String(usd.deal_bas_r).replace(/,/g, ''));
  if (Number.isNaN(rate)) return null;
  return { date: searchdate, rate };
}

// Walks backward day by day collecting the most recent `count` valid
// (business-day) EXIM 매매기준율 entries, skipping weekends/holidays with no data.
export async function getRecentRates(apiKey, count = 10, maxLookback = 30) {
  const results = [];
  const cursor = new Date();
  for (let i = 0; results.length < count && i < maxLookback; i++) {
    const entry = await fetchRateForDate(cursor, apiKey);
    if (entry) results.push(entry);
    cursor.setDate(cursor.getDate() - 1);
  }
  return results; // newest first
}

export async function getExchangeReport(apiKey) {
  const rates = await getRecentRates(apiKey, 10);
  if (rates.length === 0) {
    throw new Error('EXIM API에서 환율 데이터를 가져오지 못했습니다.');
  }

  const today = rates[0];
  const todayDate = new Date(
    `${today.date.slice(0, 4)}-${today.date.slice(4, 6)}-${today.date.slice(6, 8)}`
  );
  const weekAgoTarget = new Date(todayDate);
  weekAgoTarget.setDate(weekAgoTarget.getDate() - 7);

  // pick the most recent entry on/before the target date 7 days ago
  const lastWeek =
    rates.find((r) => {
      const d = new Date(`${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}`);
      return d <= weekAgoTarget;
    }) || rates[rates.length - 1];

  const diff = today.rate - lastWeek.rate;
  const diffPercent = (diff / lastWeek.rate) * 100;

  return {
    today: today.date,
    todayRate: today.rate,
    lastWeek: lastWeek.date,
    lastWeekRate: lastWeek.rate,
    dailyRates: rates.slice(0, 7).reverse(), // oldest -> newest for trend display
    diff: Math.round(diff * 100) / 100,
    diffPercent: Math.round(diffPercent * 100) / 100,
  };
}
