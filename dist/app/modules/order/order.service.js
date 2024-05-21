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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_modal_1 = require("./order.modal");
// create order with validated mongoose
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_modal_1.Order.create(order);
    return result;
});
// get all orders or email by order with validated mongoose
const getAllOrderIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield order_modal_1.Order.find({ email });
        return result;
    }
    else {
        const result = yield order_modal_1.Order.find();
        return result;
    }
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrderIntoDB,
};
