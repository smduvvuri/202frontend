const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    profileImage: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type:String,
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String
    },
    rewardPoints: {
        type: String,
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const adminModel = mongoose.model('Admin', AdminSchema);

module.exports = adminModel;
