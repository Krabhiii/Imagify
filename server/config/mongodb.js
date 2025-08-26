import mongoose from 'mongoose'



const connectDb = async ()=>{

    mongoose.connection.on('connected',()=>{
       console.log(" Database connected")  
})
    mongoose.connect(`${process.env.MONGO_URI}/imagify`)

}
export default connectDb;