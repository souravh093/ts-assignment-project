"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
// call the Router form express
const router = (0, express_1.Router)();
// create order route
router.post('/', order_controller_1.OrderController.createOrder);
// getall order route
router.get('/', order_controller_1.OrderController.getAllOrder);
exports.OrderRoutes = router;
