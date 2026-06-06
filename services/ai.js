import Groq from "groq-sdk";
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
const MODEL = 'llama-3.3-70b-versatile';

export async function analyzeMarket(allRates, currency, lang = 'fr') {
    const bct = allRates.find(b => b.bankName === "BCT");
    const rate = bct?.rates.find(r => r.currency === currency);
    const languageNames = { fr: 'French (français)', en: 'English', ar: 'Arabic (العربية)' };
    const targetLanguage = languageNames[lang] || 'French (français)';
    const prompt = `
    You are a Tunisian financial expert analyzing today's exchange rates.
    Today's BCT rate for ${currency}/TND is:
    - Buy: ${rate?.buy}
    - Sell: ${rate?.sell}
    - Trend: ${rate?.trend}
    Write a brief analysis (maximum 2-3 sentences) to advise a Tunisian user.
    You MUST write the response in ${targetLanguage}.
    Be direct, concise, and practical.
    `;
    const response = await groq.chat.completions.create({
        model : MODEL,
        max_tokens: 150,
        messages: [{role: 'user' , content: prompt}]
    });
    return response.choices[0].message.content;
}
export async function chatWithAI(messages , allRates){
    const ratesContext = allRates.map(b => 
        `${b.bankName}: ${b.rates.map(r => 
            `${r.currency} achat:${r.buy} vente:${r.sell}`
        ).join(',')}`
    ).join('\n');
    const systemPrompt = `
    Tu es DinarBot, assistant financier tunisien.
    Tu aides les utilisateurs à comprendre les taux de change en Tunisie.
    Réponds toujours dans la langue de l'utilisateur (arabe, français, anglais).
    
    Taux du jour :
    ${ratesContext}
    `;
    const response = await groq.chat.completions.create({
        model : MODEL,
        max_tokens : 300,
        messages: [
            {role: 'system', content: systemPrompt},
            ...messages
        ]
    });
    return response.choices[0].message.content;
}
