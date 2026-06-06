export function getBestRates(allRates, currency){
    let bestBuy = null;
    let bestSell = null;
    let worstSell = null;
    allRates.forEach(bank => {
        const rate = bank.rates.find(r => r.currency === currency)
        if (!rate) return

        const buy = parseFloat(rate.buy)
        const sell = parseFloat(rate.sell)

        if (!isNaN(buy) && (!bestBuy || buy > parseFloat(bestBuy.value)))
            bestBuy = { bank: bank.bankName, value: rate.buy }

        if (!isNaN(sell) && (!bestSell || sell > parseFloat(bestSell.value)))
            bestSell = { bank: bank.bankName, value: rate.sell }

        if (!isNaN(sell) && (!worstSell || sell < parseFloat(worstSell.value)))
            worstSell = { bank: bank.bankName, value: rate.sell }
    });
    const savings = bestSell && worstSell
    ? (parseFloat(bestSell.value) - parseFloat(worstSell.value)) * 1000
    : 0;
    return {bestBuy, bestSell, savings: savings.toFixed(2)};
}

export function getTrend(allRates, currency) {
    const bct = allRates.find(b => b.bankName === 'BCT');
    if (!bct) return 'stable';
    const rate = bct.rates.find(r => r.currency === currency);
    if (!rate) return "stable";
    if (rate.trend === '▲') return 'up';
    if (rate.trend === '▼') return 'down';
    return "stable";
}

export function getAdvice(trend) {
    if (trend === "up")
        return "Bon moment pour changer — le taux est en hausse";
    if (trend === "down")
        return "Attends encore — le taux est en baisse";
    return "Taux stable — pas d\'avantage à attendre";
}