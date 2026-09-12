// src/services/fxMarketData.js
// Real EUR/USD reference data from Frankfurter (api.frankfurter.dev) — free,
// no API key, CORS-open, ECB-sourced. https://frankfurter.dev
//
// Why EUR/USD as a proxy for EURC/USDC:
// EURC and USDC are each 1:1-pegged to their fiat currency, so the ECB's
// EUR/USD reference rate is a legitimate real-world anchor for "is this
// swap rate in the right ballpark" — it is NOT the same number as the
// on-chain EURC/USDC swap rate from App Kit (services/swap.js), which
// reflects actual testnet pool pricing/slippage and can diverge from the
// fiat reference. Show both, labeled separately — don't merge them into
// one number.
//
// Limitation, stated plainly: the ECB publishes ONE rate per business day
// (~16:00 CET), not intraday ticks. There is no true 24h high/low available
// from this free source. What IS real and available: today's rate vs. the
// prior business day's rate, i.e. a real day-over-day change. That's what
// this module exposes — it does not fabricate a high/low.

const FRANKFURTER_BASE = "https://api.frankfurter.dev/v2";

/**
 * Fetches the latest EUR/USD reference rate and the prior business day's
 * rate, and returns a real day-over-day change. Frankfurter only updates
 * on business days — on weekends/holidays "latest" and "previous" may be
 * further apart than 24h; that's correct ECB behavior, not a bug.
 *
 * @returns {Promise<{
 *   rate: number,           // current EUR/USD reference rate
 *   date: string,           // ISO date of current rate
 *   previousRate: number,
 *   previousDate: string,
 *   changePct: number,      // (rate - previousRate) / previousRate * 100
 *   source: "ECB via Frankfurter"
 * }>}
 */
export async function getEurUsdReference() {
  const latestRes = await fetch(`${FRANKFURTER_BASE}/rate/EUR/USD`);
  if (!latestRes.ok) {
    throw new Error(`Frankfurter latest rate request failed: ${latestRes.status}`);
  }
  const latest = await latestRes.json(); // { date, base: "EUR", quote: "USD", rate }

  // Ask for the rate as of "yesterday" — Frankfurter returns the most
  // recent business day's rate on or before that date, which is exactly
  // the "prior business day" we want.
  const yesterday = new Date(latest.date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIso = yesterday.toISOString().slice(0, 10);

  const prevRes = await fetch(`${FRANKFURTER_BASE}/rate/EUR/USD?date=${yesterdayIso}`);
  if (!prevRes.ok) {
    throw new Error(`Frankfurter previous rate request failed: ${prevRes.status}`);
  }
  const previous = await prevRes.json();

  const changePct = ((latest.rate - previous.rate) / previous.rate) * 100;

  return {
    rate: latest.rate,
    date: latest.date,
    previousRate: previous.rate,
    previousDate: previous.date,
    changePct,
    source: "ECB via Frankfurter",
  };
}