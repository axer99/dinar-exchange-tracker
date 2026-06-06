export const PORT = process.env.PORT || 3000;

export const CURRENCIES = [
    "EUR", "USD", "GBP", "CHF", "CAD",
    "JPY", "CNY", "SAR", "AED", "KWD",
    "QAR", "BHD", "OMR", "LYD", "DZD",
    "MAD", "MRU", "DKK", "NOK", "SEK"
];

export const BANKS = [
    { slug: "banque-centrale-tunisie", name: "BCT" },
    { slug: "biat",                    name: "BIAT" },
    { slug: "stb",                     name: "STB" },
    { slug: "bna",                     name: "BNA" },
    { slug: "attijari-bank",           name: "Attijari Bank" },
    { slug: "bh",                      name: "BH Bank" },
    { slug: "uib",                     name: "UIB" },
    { slug: "atb",                     name: "ATB" },
    { slug: "amen-banque",             name: "Amen Banque" },
    { slug: "zitouna",                 name: "Zitouna" },
    { slug: "al-baraka",               name: "Al Baraka" },
    { slug: "qnb",                     name: "QNB" },
    { slug: "bt",                      name: "BT" },
    { slug: "btk",                     name: "BTK" },
    { slug: "bte",                     name: "BTE" },
    { slug: "tsb",                     name: "TSB" },
    { slug: "btl",                     name: "BTL" },
    { slug: "wifak-bank",              name: "Wifak Bank" },
    { slug: "tf-bank",                 name: "TF Bank" },
    { slug: "la-poste-tunisienne",     name: "La Poste" }
];

export const CURRENCY_COUNTRY = {
  EUR: 'EU', USD: 'US', GBP: 'GB', CHF: 'CH',
  CAD: 'CA', JPY: 'JP', CNY: 'CN', SAR: 'SA',
  AED: 'AE', KWD: 'KW', QAR: 'QA', BHD: 'BH',
  OMR: 'OM', LYD: 'LY', DZD: 'DZ', MAD: 'MA',
  MRU: 'MR', DKK: 'DK', NOK: 'NO', SEK: 'SE'
}

export const CACHE_TTL = 1800;
export const BASE_URL = "https://www.dinartunisien.com/en/bank";