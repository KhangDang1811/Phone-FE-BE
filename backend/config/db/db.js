import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB(){
    
    const url = 'mongodb+srv://admin:dTNtVTRWGRqlLrHM@cluster0.cqotd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}

 export default connectDB;