
class OrderService {
  constructor(OrderRepository) {
    this.orderRepository = OrderRepository;
  }

  async createOrder(orderReq) {
    try {
        const order = await this.orderRepository.createOrder(orderReq);
        return order;   
    } catch (error) {
        throw new Error(error);
    }
  }
}

module.exports = OrderService;

