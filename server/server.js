// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/server-status', async (req, res) => {
    try {
        const url = 'https://tsarvar.com/ru/servers/garrys-mod/46.174.50.56:27015'; // URL страницы с информацией
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        // Парсинг количества игроков
        const currentPlayers = $('.srvPage-countCur').text().trim();
        const maxPlayers = $('.srvPage-countMax').text().trim();
        
        res.json({
            current: currentPlayers,
            max: maxPlayers
        });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
