const { validatingQueue } = require("../../bull/queues/validatingQueue");

class OrderRepository {
  constructor() { 
    
  }

  async createOrder(order = {}) {
    const newOrder = order;
    const queueOptions = {
      delay: 5000,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    };
    validatingQueue.add(newOrder, queueOptions);
    return newOrder;
  }
}

module.exports = OrderRepository;

