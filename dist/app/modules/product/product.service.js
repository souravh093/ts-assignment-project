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
exports.ProductServices = void 0;
const product_modal_1 = require("./product.modal");
// create product with valid data using mongoose
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_modal_1.Product.create(product);
    return result;
});
// get all product from db query using mongoose
const getAllProductIntoDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const result = yield product_modal_1.Product.find({
            name: { $regex: searchTerm, $options: 'i' },
        });
        return result;
    }
    else {
        const result = yield product_modal_1.Product.find();
        return result;
    }
});
// get single product form db query using mongoose
const getSingleProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_modal_1.Product.findOne({ _id: productId });
    return result;
});
// update single product form db query using mongoose
const updateProductIntoDB = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_modal_1.Product.updateOne({ _id: productId }, { $set: product });
    return result;
});
// delete product form db query using mongoose
const deleteProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_modal_1.Product.deleteOne({ _id: productId });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductIntoDB,
    getSingleProductIntoDB,
    updateProductIntoDB,
    deleteProductIntoDB,
};
