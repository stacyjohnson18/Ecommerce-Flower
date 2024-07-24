import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, productCategoryController, productFiltersController, realtedProductController, updateProductController } from "../controllers/productController.js";

import formidable from "express-formidable"

const router = express.Router();


//router create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);


// update product 
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//get all products
router.get("/get-product", getProductController);

//get single product 
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get('/product-photo/:pid', getProductPhotoController)

// delete product
router.delete("/delete-product/:pid", deleteProductController);



//category wise product
router.get("/product-category/:slug", productCategoryController);


//filter product
router.post("/product-filters", productFiltersController);




//similar product
router.get("/related-product/:pid/:cid", realtedProductController);


//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;