import axios from "axios";
import * as cheerio from "cheerio";
import NodeCache from "node-cache";
import { BANKS , CURRENCIES , BASE_URL ,CACHE_TTL } from "../config.js";

const cache = new NodeCache({stdTTL: CACHE_TTL});
async function scrapeBank(bank) {
    try{
        const url = `${BASE_URL}/${bank.slug}`;
        const response = await axios.get(url, { timeout: 8000 });
        const $ = cheerio.load(response.data);
        const rates = [];
        $('#rates-tables tbody tr').each((i, row) => { 
            const cols = $(row).find('td');
            const currency = $(cols[1]).text().trim().toLocaleUpperCase();

            const isShortRow = cols.length === 6;
            const buy   = $(cols[3]).text().trim();
            const sell  = isShortRow ? '—' : $(cols[4]).text().trim();
            const trend = isShortRow ? $(cols[4]).find('span').text().trim() : $(cols[5]).find('span').text().trim();
            if(currency && CURRENCIES.includes(currency)){
                rates.push({currency, buy, sell, trend});
            }
        });
        return {
            bankName: bank.name, rates
        }
    } catch(error) {
        console.error(`Erreur scraping ${bank.name}:`, error.message)
        return { bankName: bank.name, rates: [] }
    }
}
async function getAllRates(){
    const cached = cache.get('rates');
    if(cached){
        return cached;
    }
    const results = await Promise.all(
        BANKS.map(bank => scrapeBank(bank))
    );
    cache.set("rates", results);
    return results;
}
export default getAllRates;