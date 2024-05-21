"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
// call the Router form express
const router = (0, express_1.Router)();
// All product routes here blow
// create product route
router.post('/', product_controller_1.ProductController.createProduct);
// get all product route
router.get('/', product_controller_1.ProductController.getAllProduct);
// get single product route
router.get('/:productId', product_controller_1.ProductController.getSingleProduct);
// update single product route
router.put('/:productId', product_controller_1.ProductController.updateProduct);
// delete product route
router.delete('/:productId', product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
