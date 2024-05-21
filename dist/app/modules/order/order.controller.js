"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const product_service_1 = require("../product/product.service");
// create order controller
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get order data form client
        const order = req.body;
        // validation order using zod
        const validateOrderData = order_validation_1.default.parse(order);
        // get product details
        const product = yield product_service_1.ProductServices.getSingleProductIntoDB(validateOrderData.productId);
        // if product not found then rend message
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        // if the ordered quantity is gather then product quantity
        if (validateOrderData.quantity > product.inventory.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        // update product inventory quantity and inStock
        product.inventory.quantity -= validateOrderData.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        // update the product using the order data following
        yield product_service_1.ProductServices.updateProductIntoDB(product._id.toString(), product);
        // call service and create order
        const result = yield order_service_1.OrderServices.createOrderIntoDB(validateOrderData);
        // response return data
        return res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // send error response to the client
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error,
        });
    }
});
// get all orders controller or email by orders
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get email by query
        const { email } = req.query;
        // get all order
        const result = yield order_service_1.OrderServices.getAllOrderIntoDB(email);
        // response all order data
        return res.status(200).json({
            success: result.length === 0 ? false : true,
            message: email && result.length > 0
                ? 'Orders fetched successfully for user email!'
                : result.length === 0
                    ? 'Order not found'
                    : 'Orders fetched successfully!',
            data: result.length > 0 ? result : null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // send error response to the client
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
