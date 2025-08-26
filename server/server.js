import express from "express";
import cors from 'cors';
import 'dotenv/config'
import connectDb from "./config/mongodb.js";
import userRouter from "./routes/userroute.js";
import imageRouter from "./routes/imageroutes.js";
const PORT= process.env.PORT ||4000;
const app = express();

app.use(cors());
app.use(express.json());
await connectDb();

app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)

app.get('/',(req,res)=>{
    res.send("API is working")

});
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})