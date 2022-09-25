const express = require('express');

const salesProductController = require('../controllers/salesProductController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post(
  '/sales',
  authenticationMiddleware,
  (req, res) => salesProductController.createSales(req, res)
);

module.exports = router;