const { Router } = require('express');
const { createOrder } = require('../controllers/OrderController');

const router = Router();

router.post('/', createOrder);

module.exports = router;

