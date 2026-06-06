import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translations = {
  en: JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf8')),
  fr: JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/fr.json'), 'utf8')),
  ar: JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/ar.json'), 'utf8'))
};

export default function i18n(req, res, next) {
  let lang = 'fr'; // default to French
  
  if (req.query.lang && ['ar', 'fr', 'en'].includes(req.query.lang)) {
    lang = req.query.lang;
    res.setHeader('Set-Cookie', `lang=${lang}; Path=/; Max-Age=31536000`);
  } else if (req.headers.cookie) {
    const cookies = Object.fromEntries(
      req.headers.cookie.split(';').map(c => {
        const parts = c.trim().split('=');
        return [parts[0], parts[1]];
      })
    );
    if (cookies.lang && ['ar', 'fr', 'en'].includes(cookies.lang)) {
      lang = cookies.lang;
    }
  }

  req.lang = lang;
  res.locals.lang = lang;
  res.locals.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  res.locals.__ = (key, ...args) => {
    let translation = (translations[lang] && translations[lang][key]) || 
                      (translations['fr'] && translations['fr'][key]) || 
                      key;
    
    args.forEach(arg => {
      translation = translation.replace('%s', arg);
    });
    return translation;
  };

  req.__ = res.locals.__;
  
  next();
}
