const OrderService = require('../services/OrderService');
const OrderRepository = require('../repositories/OrderRepository');
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

const createOrder = async (req, res) => {
    try {
        if (!req.body.product || !req.body.quantity) {
            return res.status(400).json({ message: 'Data produk dan jumlah harus diisi.' });
        }

        const order = await orderService.createOrder(req.body);
        return res.status(201).json({ status: true, code: 200, message: 'Order created successfully', data: order });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ status: false, code: 500, message: 'Terjadi kesalahan saat membuat order' });
    }
};

module.exports = { createOrder };

