const mongoose = require('mongoose')
const dotenv = require('dotenv')



const connectDB = ()=>{
    return new Promise ((resolve, reject)=>{
        const option = {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }

        mongoose
        .connect(process.env.BASE, option)
        .then((con) => resolve (con))
        .then((err) => reject(err))
    })
}


module.exports = connectDB