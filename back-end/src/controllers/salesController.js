const { StatusCodes } = require('http-status-codes');
const SalesService = require('../services/salesService');

class SalesController {
  constructor() {
    this.service = SalesService;
  }

  async create(req, res) {
    const sale = {
      userId: req.user.id,
      sellerId: req.body.sellerId,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
      deliveryNumber: req.body.deliveryNumber,
    };

    const { products } = req.body;

    const result = await this.service.create(sale, products);

    res.status(StatusCodes.CREATED).json(result);
  }

  async getAllByUserId(req, res) {
    const { id: userId } = req.user;

    const sales = await this.service.getAllByUserId(userId);

    res.status(StatusCodes.OK).json(sales);
  }

  async getAllBySellerId(req, res) {
    const { id: sellerId } = req.user;

    const sales = await this.service.getAllBySellerId(sellerId);

    res.status(StatusCodes.OK).json(sales);
  }

  async getById(req, res) {
    const { id } = req.params;

    const sale = await this.service.getById(Number(id));

    res.status(StatusCodes.OK).json(sale);
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const updatedSale = await this.service.updateStatus(id, status);
    
    res.status(StatusCodes.OK).json(updatedSale);
  }
}

module.exports = new SalesController();