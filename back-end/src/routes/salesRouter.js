const express = require('express');

const salesController = require('../controllers/salesController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post(
  '/sales',
  authenticationMiddleware,
  (req, res) => salesController.create(req, res),
);

router.get(
  '/sales',
  authenticationMiddleware,
  (req, res) => salesController.getAllByUserId(req, res),
);

router.get(
  '/sales/seller',
  authenticationMiddleware,
  (req, res) => salesController.getAllBySellerId(req, res),
);

router.get(
  '/sales/:id',
  authenticationMiddleware,
  (req, res) => salesController.getById(req, res),
);

router.patch(
  '/sales/:id',
  authenticationMiddleware,
  (req, res) => salesController.updateStatus(req, res),
);

module.exports = router;