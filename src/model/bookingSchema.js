const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  current_location:{
    type: String,
    required: true
  },
  new_location:{
    type: String,
    required: true
  },
  services:{
    type: String,
    required: true,
    enum:['home', 'office']
  },
  vehicle:{
    type:String,
    required:true,
    enum:['truck', 'lorry']
  }

},
{
    timestamps:true
}
);

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;