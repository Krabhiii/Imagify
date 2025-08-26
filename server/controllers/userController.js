import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import razorpay from 'razorpay'


import transactionModel from '../models/transactionModel.js';
import { json } from 'express';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Details missing" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const razorpayinstance  = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
key_secret : process.env.RAZORPAY_SECRET_KEY
})
const paymentRazorpay = async(req,res) =>{
  try {
    const {userId,planId} = req.body;
    const userData  = await userModel.findById(userId)

    if(!userData || !planId){
      return res.json({success:false, message :"missing details"})
    }
let credits,plan,amount,date 
switch (planId) {
  case "Basic":
    plan = "Basic"
    credits = 100
    amount = 10  
    break;
      case "Advanced":
    plan = "Advanced"
    credits = 500
    amount = 50
    break;
      case "Business":
    plan = "Business"
    credits = 5000
    amount = 250
    break;

  default:
    return res.json({success:false, message:"plan not found"})
} 
date = Date.now();
const transactionData = {

  userId,plan,amount,credits,date
}
const newtransaction = await transactionModel.create(transactionData);


  const options = {
    amount : amount*100, 
    currency :process.env.CURRENCY,
    receipt:newtransaction._id
  }
  await razorpayinstance.orders.create(SchemaTypeOptions,(error,order)=>{
    if(error){
      console.log(error);
    return res.json({success:false, message:error})
    }
    return res.json({success:true ,order})
})


  } catch (error) {
    console.log(error);
    res.json({success:false,message : error.message})
  }
}
const verifyRazor = async(req,res) =>{
  try {
    const{ razorpay_order_id} = req.body
    const orderInfo = razorpayinstance.orders.fetch(razorpay_order_id)
if(orderInfo.status === 'paid'){
  const transactionData = await transactionModel.findById(orderInfo.receipt)
  if(transactionData.payment){
    return res.json({success:false , message :"payment failed"})
  }
  const userData = await userModel.findById(transactionData.userId)
  const creditBalance = userData.creditBalance +transactionData.credits
  await userModel.findById(userData._id(creditBalance))
  await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
  res.json({success:true,message:"credit added"})
}
res.json({success:false,message:"payment failed"})

  } catch (error) {
    console.log(error)
    res,json({success:false ,message:error.message})
  }
}
export { registerUser, loginUser, userCredits, paymentRazorpay,verifyRazor};
