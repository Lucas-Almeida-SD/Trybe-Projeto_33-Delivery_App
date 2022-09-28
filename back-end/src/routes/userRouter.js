const express = require('express');

const UserController = require('../controllers/userController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/user', (req, res) => UserController.create(req, res));
router.get('/user/:role', (req, res) => UserController.getAllByRole(req, res));
router.post(
  '/user/admin', 
  authenticationMiddleware,
  (req, res) => UserController.create(req, res),
);
module.exports = router;