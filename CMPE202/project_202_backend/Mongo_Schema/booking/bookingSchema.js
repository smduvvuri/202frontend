const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingNumber:{
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"  
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: "hotels"  
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "rooms"  
    },
    amount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        Enum: ['Success','Fail','Cancelled']
    },
}, {
  timestamps: true,
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
