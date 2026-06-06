import axios from "axios";
import { CURRENCIES, CURRENCY_COUNTRY } from "../config.js";

async function forecastPage(req, res) {
  try {
    const currency = CURRENCIES.includes(req.query.currency) ? req.query.currency : 'EUR';

    const response = await axios.get(`https://open.er-api.com/v6/latest/${currency}`, { timeout: 8000 });
    const baseRate = response.data.rates['TND'];

    // 60 jours d'historique simulé
    const labels = [];
    const values = [];
    for (let i = 59; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toISOString().split('T')[0]);
      const variation = 1 + (Math.random() - 0.5) * 0.01;
      values.push(+(baseRate * variation).toFixed(4));
    }

    const wma = values.map((_, i) => {
      if (i < 6) return null;
      const slice = values.slice(i - 6, i + 1);
      return +(slice.reduce((a, b) => a + b, 0) / 7).toFixed(4);
    })

    const lastValues = values.slice(-7);
    const avgChange = (lastValues[6] - lastValues[0]) / 6;
    const forecast = Array.from({ length: 7 }, (_, i) =>
      +(values[values.length - 1] + avgChange * (i + 1)).toFixed(4)
    );

    res.render('forecast', { labels, values, wma, forecast, currency, CURRENCIES, CURRENCY_COUNTRY , page: 'forecast'});
  } catch (error) {
    console.error("Erreur forecastPage :", error);
    res.status(500).send('Erreur forecast');
  }
}

export default forecastPage;