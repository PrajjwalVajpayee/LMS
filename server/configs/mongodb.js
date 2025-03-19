import mongoose from 'mongoose'

//  connection
const connectdb = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Database Connected')
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectdb;
