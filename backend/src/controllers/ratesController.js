const pool = require('../db');

async function getRates(req, res) {
    const { date, currency } = req.params; 
    const [year, month, day] = date.split('-');
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Attempting to retrieve data from DB for currency and date:', currency, date);
        const data = await conn.query('SELECT * FROM myTable WHERE currency = ? AND date = ?', [currency, date]);
        if (data.length > 0) {
            console.log('Data found in DB:', data);
            if (typeof data[0].rates === 'string') {
                res.json(JSON.parse(data[0].rates));
            } else {
                res.json(data[0].rates);
            }
        } else {
            console.log('Data not found in DB, fetching from API for currency and date:', currency, date);
            const response = await req.exchangeRateApi.get(`history/${currency}/${year}/${month}/${day}`);
            console.log('Response from API:', response.data);
            const rates = response.data.conversion_rates;
            console.log('Rates to be inserted into DB:', rates);
            await conn.query('INSERT INTO myTable (currency, date, rates) VALUES (?, ?, ?)', [currency, date, JSON.stringify(rates)]);
            res.json(response.data.conversion_rates);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Currency or date not found' });
        } else {
            res.status(500).json({ error: 'An error occurred while fetching data from the ExchangeRate-API' });
        }
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    getRates,
};
