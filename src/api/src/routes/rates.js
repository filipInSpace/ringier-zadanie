/**
 * @swagger
 * /api/rates/{currency}/{date}:
 *   get:
 *     summary: Retrieve exchange rates for a specific currency and date
 *     description: Retrieve exchange rates for a given currency on a specified date from the database or external API if not present in the database.
 *     parameters:
 *       - in: path
 *         name: currency
 *         required: true
 *         description: Currency code to get the exchange rates for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: Date to get the exchange rates for in YYYY-MM-DD format.
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *     responses:
 *       200:
 *         description: An object containing the exchange rates for the specified currency and date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: number
 *       404:
 *         description: Currency or date not found.
 *       500:
 *         description: An error occurred while fetching data from the ExchangeRate-API.
 */

const express = require('express');
const router = express.Router();
const apiCommunication = require('../middleware/apiCommunication');
const { getRates } = require('../controllers/ratesController');

router.get('/:currency/:date', apiCommunication, getRates);

module.exports = router;
