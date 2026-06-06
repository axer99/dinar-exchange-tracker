import getAllRates from "../services/scraper.js";
import { getBestRates , getTrend , getAdvice } from "../services/analysis.js";
import { analyzeMarket } from "../services/ai.js";
import { CURRENCIES , CURRENCY_COUNTRY, CACHE_TTL } from "../config.js";
import NodeCache from "node-cache";

const aiCache = new NodeCache({ stdTTL: CACHE_TTL });

async function homePage(req ,res) {
    const allRates = await getAllRates();
    const currency = CURRENCIES.includes(req.query.currency) ? req.query.currency : 'EUR';
    const bestRates = getBestRates(allRates,currency);
    const trend = getTrend(allRates,currency);
    const advice = getAdvice(trend);
    const aiCacheKey = `ai_${currency}`;
    let aiAnalysis = aiCache.get(aiCacheKey) || '';
    if (!aiAnalysis) {
        try {
            aiAnalysis = await analyzeMarket(allRates, currency);
            aiCache.set(aiCacheKey, aiAnalysis);
        } catch (err) {
            console.error('AI analysis failed:', err.message);
            aiAnalysis = 'Analyse IA temporairement indisponible.';
        }
    }
    res.render("index", {
        allRates, currency, bestRates, trend, advice, aiAnalysis, CURRENCIES, CURRENCY_COUNTRY, page: 'home'
    });
}
export default homePage;