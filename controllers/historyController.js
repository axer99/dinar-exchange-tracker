import axios from "axios";
import { CURRENCIES, CURRENCY_COUNTRY } from "../config.js";

async function historyPage(req, res) {
  try {
    const currency = CURRENCIES.includes(req.query.currency) ? req.query.currency : 'EUR';

    const response = await axios.get(`https://open.er-api.com/v6/latest/${currency}`, { timeout: 8000 });
    const baseRate = response.data.rates['TND']

    // 30 jours d'historique simulé
    const labels = [];
    const values = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toISOString().split('T')[0]);
      const variation = 1 + (Math.random() - 0.5) * 0.01;
      values.push(+(baseRate * variation).toFixed(4));
    }

    res.render('history', { labels, values, currency, CURRENCIES, CURRENCY_COUNTRY , page: 'history'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching history');
  }
}

export default historyPage;