import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getUserController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);


// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(201).send({ ok: true });
})


// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(201).send({ ok: true });
})


//update profile
router.put("/profile", requireSignIn, updateProfileController);


//order
router.get('/orders', requireSignIn, getOrdersController);

// all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);


// order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);


// get all users 
router.get('/get-users', requireSignIn, isAdmin, getUserController)
export default router;
