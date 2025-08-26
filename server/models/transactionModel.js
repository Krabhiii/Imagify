import mongoose from "mongoose";
import { number } from "motion";

const transactionSchema = new mongoose.Schema({
   userId: {type :String, required:true},
   plan : {type :String, required:true},
   amount :{type :Number, required:true},
   credits: {type :Number, required:true},
   payment :{type :Boolean, default:false},
    date:{type :Number}
});

// Use "User" as the model name
const transactionModel = mongoose.models.User || mongoose.model("transaction", transactionSchema);

export default transactionModel;
