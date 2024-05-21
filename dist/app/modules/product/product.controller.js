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
exports.ProductController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
// create product controller
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get product data from client side
        const product = req.body;
        // validation data using zod
        const validateProductData = product_validation_1.default.parse(product);
        // create product
        const result = yield product_service_1.ProductServices.createProductIntoDB(validateProductData);
        //   send response to the client
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
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
// get products controller
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        // get product using call service function
        const result = yield product_service_1.ProductServices.getAllProductIntoDB(searchTerm);
        // response for get all product
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term ${searchTerm} fetched successfully!`
                : 'Products fetched successfully!',
            data: result,
        });
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
// get single product controller
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // get single product using id
        const result = yield product_service_1.ProductServices.getSingleProductIntoDB(productId);
        // response for get single product
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
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
// update product controller
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = req.body;
        // update data pass two arguments
        const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, product);
        // response data
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // update data pass two arguments
        yield product_service_1.ProductServices.deleteProductIntoDB(productId);
        // response data
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
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
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
