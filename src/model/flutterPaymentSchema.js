const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    amount: {
        type: String,
        required: true
      },
      currency:{
        type: String,
        required: true
      },
      card_number:{
        type: String,
        required: true
      },
      cvv:{
        type: String,
        required: true,
      },
      expiry_year:{
        type:String,
        required:true,
      },
      expiry_month:{
        type: String,
        required:true
      },
      email:{
        type: String,
        required:true
      },

    tx_ref:{
        type:String,
        required:true
    },

    pin:{
        type:String,
        required:true
    }
})

const PaymentModel = mongoose.model('Booking', PaymentSchema)

module.exports = PaymentModel