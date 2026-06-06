import getAllRates from "../services/scraper.js";
import { CURRENCIES , CURRENCY_COUNTRY} from "../config.js";
import { chatWithAI } from "../services/ai.js"
async function chatPage(req ,res) {
    res.render('chat', { CURRENCIES, CURRENCY_COUNTRY, page: 'chat' });
}

async function sendMessage(req ,res) {
    try{
        const messages = req.body.messages;
        const allRates = await getAllRates();
        const reply = await chatWithAI(messages, allRates);
        return res.json({reply})
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur IA' })
    }
}
export { chatPage, sendMessage }
