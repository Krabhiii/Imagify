import express from 'express'
import {loginUser, paymentRazorpay, registerUser,userCredits, verifyRazor} from '../controllers/userController.js'
import userauth from '../middlewares/auth.js';




const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/credits",userauth,userCredits)
userRouter.post("/pay-razor",userauth,paymentRazorpay)
userRouter.post("/verify-razor",verifyRazor)

export default userRouter