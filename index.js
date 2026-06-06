import express from "express";
import morgan from "morgan";
import {fileURLToPath} from "url";
import path from "path";
import 'dotenv/config';
import 'express-async-errors';
import router from "./routes/index.js";
import apiRouter from './routes/api.js';
import i18n from "./middleware/i18n.js";

import { PORT } from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(i18n);
app.use("/", router);
app.use('/', apiRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.set('view engine','ejs');
app.set('views', path.join(__dirname, "views"));

app.listen(PORT, () => {
    console.log(`Port is Running in ${PORT}`);
});

