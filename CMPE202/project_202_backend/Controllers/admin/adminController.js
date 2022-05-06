const Admin = require('../../Mongo_Schema/admin/adminSchema');

const Hotel = require('../../Mongo_Schema/hotel/hotelSchema');
const Room = require('../../Mongo_Schema/room/roomSchema');
const Book = require('../../Mongo_Schema/booking/bookingSchema');
const responseMessages = require('../../constants/responseMessages');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');
const { read } = require('fs');
const config = require('../../config/config');
const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
const { v4: uuid_v4 } = require('uuid');


const maxAge = 15 * 24 * 60 * 60;



const adminController = {};

// create Sub admin\

const createToken = function (id) {

    console.log('creating token');
    return jwt.sign({ id, isRefreshToken: false }, 'secret', {
        expiresIn: maxAge
    });

}

adminController.signup = async function (req, res) {

    Admin.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            res.status(responseMessages.userExists.code).json({
                message: responseMessages.userExists.message
            });
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const admin = {
                    userName: req.body.name,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,    
                    password: hash,
                    type: req.body.type,
                }

                Admin.create(admin).then(function (admin) {
                    const token = createToken(admin._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(responseMessages.signedUp.code).json({
                        message: responseMessages.signedUp.message,
                        result: admin
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(responseMessages.signUpFailed.code).json({
                        message: responseMessages.signUpFailed.message
                    });
                });
            }).catch(function (err) {
                res.status(responseMessages.couldNotGenerateHash.code).json({
                    message: responseMessages.couldNotGenerateHash.message
                });
            });
        }
    }).catch(function (err) {
        res.status(responseMessages.internalError.code).json({
            message: responseMessages.internalError.message
        });
    });

}

adminController.signin = async function (req, res) {
//{"message":"Signed in successfully.","result":{"adminType":"","email":"aditya@gmail.com","_id":"62734d567f7c49206c61fecc","mobileNumber":"1234567890","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzM0ZDU2N2Y3YzQ5MjA2YzYxZmVjYyIsImlzUmVmcmVzaFRva2VuIjpmYWxzZSwiaWF0IjoxNjUxNzI0MDIzLCJleHAiOjE2NTMwMjAwMjN9.WrGTKHNved0b7W2d2oeGVkjQp_ZfpaCUJ03LjKM2kqM"}}
    try{
        const { email, password } = req.body;

        if (!email) {
            res.status(responseMessages.emailRequired.code).json({
                message: responseMessages.emailRequired.message
            });
        } else if (!password) {
            res.status(responseMessages.passwordRequired.code).json({
                message: responseMessages.passwordRequired.message
            })
        } else {
            const admin = await Admin.findOne({ email: email });
            if (!admin) {
                res.status(responseMessages.adminDoesNotExist.code).json({
                    message: responseMessages.adminDoesNotExist.message
                });
            } else {
                const match = await bcrypt.compare(req.body.password, admin.password);
            
                if (match) {
                    const token = createToken(admin._id);
                    admin.token = token;
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(responseMessages.signedIn.code).json({
                        message: responseMessages.signedIn.message,
                        result: {
                            adminType: admin.type,
                            email: admin.email,
                            _id: admin._id,
                            mobileNumber: admin.mobileNumber,
                            token: token,
                            userName: admin.userName,
                            profileImage: admin.profileImage
                        }
                    });
                    // return res.json({
                    //     token,
                    //     user: {
                    //         _id: admin._id,
                    //         name: admin.userName,
                    //         email: admin.email,
                    //         createdAt: (new Date()).getTime(),
                    //         updatedAt: (new Date()).getTime(),
                    //     },
                    // });
                } else {
                    res.status(responseMessages.signInFailed.code).json({
                        message: responseMessages.signInFailed.message
                    });
                }
            }
        }
    } catch(err) {
        console.log(err);
        res.status(responseMessages.signInFailed.code).json({
            message: responseMessages.signInFailed.message,
            err: err
        });
    } 
}


adminController.addHotel = async function (req, res){
    console.log("hi")
    try{
            const hotel = {
                hotelNumber: req.body.hotelNumber,
                hotelName: req.body.hotelName,
                hotelDescription: req.body.hotelDescription,
                hotelLocation: req.body.hotelLocation,
                hotelAddress: req.body.hotelAddress,
                hotelImage: req.body.hotelImage,
                breakfast: req.body.breakfast,
                meal: req.body.meal,
                gym: req.body.gym,
                pool: req.body.pool,
                parking: req.body.parking,
                hotelCharge: req.body.hotelCharge,
                weekendCharge: req.body.weekendCharge,
                holidayCharge: req.body.holidayCharge,
                seasonCharge: req.body.seasonCharge,
            }

            const hotelCreated = await Hotel.create( hotel );
            
            const updateHotel = await Hotel.findByIdAndUpdate( 
                { _id: hotelCreated._id },
            );
            const updatedData = await Hotel.findOne({ _id: updateHotel._id });

            result = {
                updatedData
            }
            
            res.status(responseMessages.hotelCreated.code).json({
                message: responseMessages.hotelCreated.message,
                result: result
            });
        
            
    } catch(err) {
        console.log(err);
        res.status(responseMessages.hotelCreationFailed.code).json({
            message: responseMessages.hotelCreationFailed.message
        });
    }
}

adminController.updateHotel = async function (req, res) {
    try{
        const findHotel = await Hotel.findOne({hotelName:req.body.hotelName});
        

    
        const hotel = await Hotel.findOneAndUpdate(
            { hotelName:req.body.hotelName },
            {
                ...req.body,
            }
        );
        
        const findHotelToReturn = await Hotel.findOne({hotelName:req.body.hotelName});
        
        if (findHotelToReturn) {
            res.status(responseMessages.hotelUpdate.code).json({
                message: responseMessages.hotelUpdate.message,
                res: findHotelToReturn
            });
        }
    }catch(err) {
        console.log(err);
        res.status(responseMessages.hotelUpdateFailed.code).json({
            message: responseMessages.hotelUpdateFailed.message
        });
    }
}

adminController.deleteHotel = async function (req, res) {
    try{
        const deleteHotel = await Hotel.findOneAndDelete({ hotelName:req.body.hotelName });
        
        res.status(responseMessages.hotelDelete.code).json({
            message: responseMessages.hotelDelete.message,
        });
    }catch(err) {
        res.status(responseMessages.hotelDeleteError.code).json({
            message: responseMessages.hotelDeleteError.message
        });
    }
}

adminController.deleteHotelFromId = async function (req, res) {
    try{
        const deleteHotel = await Hotel.findOneAndDelete({ hotelNumber:req.body.hotelNumber });
        
        res.status(responseMessages.hotelDelete.code).json({
            message: responseMessages.hotelDelete.message,
        });
    }catch(err) {
        res.status(responseMessages.hotelDeleteError.code).json({
            message: responseMessages.hotelDeleteError.message
        });
    }
}
adminController.getAllHotels = async function(req, res){
    console.log("hello")
    const hotels = await Hotel.find({});
    if(hotels){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            hotels: hotels,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}
adminController.getHotel = async function(req,res){
    console.log("Hi there!")
    const hotel = await Hotel.findOne({hotelNumber: req.body.hotelNumber });
    if(hotel){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            hotel:hotel,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}
adminController.getHotelFromLocation = async function(req,res){
    const hotels = await Hotel.find({hotelLocation: req.body.hotelLocation });
    if(hotels.length != 0){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            hotels:hotels,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}

adminController.addRoom = async function(req,res){
    console.log("room added")
    try{
        const room = {
            roomNumber : req.body.roomNumber,
            hotelNumber : req.body.hotelNumber, 
            type : req.body.type,
            image : req.body.image,
            description : req.body.description,
            typeCharge : req.body.typeCharge,
            roomBasePrice : req.body.roomBasePrice,
            currentPrice : req.body.currentPrice 
        }

        const roomCreated = await Room.create( room );
        
        const updateroom = await Room.findByIdAndUpdate( 
            { _id: roomCreated._id },
        );
        const updatedData = await Room.findOne({ _id: updateroom._id });

        result = {
            updatedData
        }
        
        res.status(responseMessages.hotelCreated.code).json({
            message: responseMessages.hotelCreated.message,
            result: result
        });
    
        
} catch(err) {
    console.log(err);
    res.status(responseMessages.hotelCreationFailed.code).json({
        message: responseMessages.hotelCreationFailed.message
    });
}
}
adminController.updateRoom = async function (req, res) {
    try{
        const findRoom = await Room.findOne({roomNumber:req.body.roomNumber});
        
        const room = await Room.findOneAndUpdate(
            { roomNumber:req.body.roomNumber },
            {
                ...req.body,
            }
        );
        
        const findRoomToReturn = await Room.findOne({roomNumber:req.body.roomNumber});
        
        if (findRoomToReturn) {
            res.status(responseMessages.hotelUpdate.code).json({
                message: responseMessages.hotelUpdate.message,
                res: findRoomToReturn
            });
        }
    }catch(err) {
        console.log(err);
        res.status(responseMessages.hotelUpdateFailed.code).json({
            message: responseMessages.hotelUpdateFailed.message
        });
    }
}

adminController.getAllRooms = async function(req, res){
    console.log("hello")
    const rooms = await Room.find({});
    if(rooms){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            rooms: rooms.roomNumber,
            rooms: rooms.hotelDescription
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}

adminController.getRoomFromHotel = async function(req,res){
    console.log("Hi there!")
    const rooms = await Room.find({hotelNumber: req.body.hotelNumber });
    if(rooms){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            rooms:rooms,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}
adminController.getPriceFromRoomNumber = async function(req,res){
    console.log("Hi there!")
    const room = await Room.findone({roomNumber: req.body.roomNumber });
    if(room){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            price:room.currentPrice,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}

adminController.getRoom = async function(req,res){
    console.log("Hi there!")
    const room = await Room.findOne({roomNumber: req.params.hn });
    if(room){
        res.status(responseMessages.hotelsFound.code).json({
            message: responseMessages.hotelsFound.message,
            room:room.roomNumber,
        });
    }else{
        res.status(responseMessages.hotelsNotFound.code).json({
            message: responseMessages.hotelsNotFound.message,
        });
    }
}

adminController.addBooking = async function(req,res){
    console.log("booking")
    try{
        
        const book = {
            userId: req.body.userId,
            hotelId: req.body.hotelId,
            roomId: req.body.RoomID,
            amount: req.body.amount,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            guests: req.body.guests,
            status: req.body.status,
            price: price
        }

        const bookingCreated = await Book.create( book );
        
        const updateBooking = await Book.findByIdAndUpdate( 
            { _id: bookingCreated._id },
        );
        const updatedData = await Book.findOne({ _id: updateBooking._id });

        result = {
            updatedData
        }
        
        res.status(responseMessages.hotelCreated.code).json({
            message: responseMessages.hotelCreated.message,
            result: result
        });
    
        
} catch(err) {
    console.log(err);
    res.status(responseMessages.hotelCreationFailed.code).json({
        message: responseMessages.hotelCreationFailed.message
    });
}
}

adminController.updateBooking = async function (req, res) {
    try{
        const findBooking = await Book.findOne({bookingNumber:req.body.bookingNumber});
        

    
        const booking = await Book.findOneAndUpdate(
            { bookingNumber:req.body.bookingNumber },
            {
                ...req.body,
            }
        );
        
        const findBookingToReturn = await Book.findOne({bookingNumber:req.body.bookingNumber});
        
        if (findBookingToReturn) {
            res.status(responseMessages.hotelUpdate.code).json({
                message: responseMessages.hotelUpdate.message,
                res: findBookingToReturn
            });
        }
    }catch(err) {
        console.log(err);
        res.status(responseMessages.hotelUpdateFailed.code).json({
            message: responseMessages.hotelUpdateFailed.message
        });
    }
}

adminController.deleteBookingFromId = async function (req, res) {
    try{
        const deleteBooking = await Book.findOneAndDelete({ bookingNumber:req.body.bookingNumber });
        
        res.status(responseMessages.hotelDelete.code).json({
            message: responseMessages.hotelDelete.message,
        });
    }catch(err) {
        res.status(responseMessages.hotelDeleteError.code).json({
            message: responseMessages.hotelDeleteError.message
        });
    }
}
module.exports = adminController;