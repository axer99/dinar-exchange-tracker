import getAllRates from "../services/scraper.js";
import { getBestRates } from "../services/analysis.js";
import { CURRENCIES , CURRENCY_COUNTRY} from "../config.js";

async function comparePage(req, res) {
    const currency = req.query.currency || 'EUR';
    const allRates = await getAllRates();
    const comparison = allRates.map(bank => {
        const rate = bank.rates.find(r => r.currency === currency);
        return rate ? { bankName: bank.bankName, ...rate } : null;
    }).filter(Boolean);
    comparison.sort((a, b) => parseFloat(b.sell) - parseFloat(a.sell));
    const bestRates = getBestRates(allRates , currency);
    res.render('compare', { comparison, bestRates, currency, CURRENCIES, CURRENCY_COUNTRY,page: 'compare' });
}
export default comparePage;