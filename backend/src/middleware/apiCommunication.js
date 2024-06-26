const axios = require('axios');

function apiCommunication(req, res, next) {
    req.exchangeRateApi = axios.create({
        baseURL: `https://v6.exchangerate-api.com/v6/${process.env.ER_API_KEY}/`,
    });
    next();
}

module.exports = apiCommunication;