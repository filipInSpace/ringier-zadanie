const cron = require('node-cron');
const pool = require('./db');
const axios = require('axios');

cron.schedule('0 0 * * *', async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.ER_API_KEY}/latest/USD`);
        if (response.data && response.data.conversion_rates) {
            const newCurrencies = Object.keys(response.data.conversion_rates);
            if (Array.isArray(newCurrencies) && newCurrencies.length > 0) {
                const currentCurrenciesResult = await conn.query('SELECT currency FROM myTable');
                const currentCurrencies = currentCurrenciesResult.map(row => row.currency);
                const currenciesToAdd = newCurrencies.filter(currency => !currentCurrencies.includes(currency));
                const currenciesToRemove = currentCurrencies.filter(currency => !newCurrencies.includes(currency));
                for (const currency of currenciesToAdd) {
                    await conn.query('INSERT INTO myTable (currency) VALUES (?)', [currency]);
                }
                for (const currency of currenciesToRemove) {
                    await conn.query('UPDATE myTable SET active = false WHERE currency = ?', [currency]);
                }
            } else {
                console.error('Invalid data:', newCurrencies);
            }
        } else {
            console.error('Unexpected response:', response.data);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        if (conn) conn.end();
    }
});
