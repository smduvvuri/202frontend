
import React from 'react';
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";
import ConnectNav from "../components/ConnectNav";
import UserDashboardNav from './UserDashboardNav';
import {Redirect, Link} from "react-router-dom";

let searchResult=false;


export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fields: {},
          errors: {},
          message: "",
          isSafe: false,
          hotels: [],
          rooms: [],
          result: [],
          hotelNumber: "",
          roomNumber:"",
          hotelNumber:"",
          roomBasePrice:"",
          type:"",
          typeCharge:"",
          currentPrice:"",
          description:"",
          startDate:"",
          endDate:"",
          friend: false,
          price: "",
          bookingNumber: null,
          userId:"",
          hotelNumber:"",
          roomNumber:"",
          startDate:"",
          endDate:"",
          guests:"",
          status:""
        
        
        };
       console.log(props.location.state)
  
      }
      componentDidMount() {
        searchResult=false;
        let data={
            amount: this.props.location.state.amount,
            bookingNumber: this.props.location.state.bookingNumber,
            userId: this.props.location.state.userId,
            hotelId:this.props.location.state.hotelId,
            roomId:this.props.location.state.roomId,
            startDate:this.props.location.state.startDate,
            endDate:this.props.location.state.endDate,
            guests: this.props.location.state.guests,
            status: this.props.location.state.status
        };
        axios.post(`${process.env.REACT_APP_API}/addBooking`,data, {
          headers: {
              authorization: JSON.parse(localStorage.getItem('auth')).result.token
          }
      })
            .then(res => {
                const hotels = res.data.hotels;
                this.setState({hotels});
            })
    }



    render() {
      
        return (
          
            <>
           
                <div className="container-fluid bg-secondary p-5">
                <ConnectNav/>
                </div>

                <div className="container-fluid p-4">
                <UserDashboardNav />
                </div>
                
               <form>
                   <h4>Booking Confirmed!
                   </h4>
                   <h3>
                       The following are the booking details:
                   </h3>

                   <p>
                   
                       Booking Number: {this.props.location.state.bookingNumber},
                       User ID: {this.props.location.state.userId},
                       Hotel Number:{this.props.location.state.hotelId},
                       Room Number:{this.props.location.state.roomId},
                       Start Date:{this.props.location.state.startDate},
                       End Date:{this.props.location.state.endDate},
                       Number of Guests: {this.props.location.state.guests},
                       Status: {this.props.location.state.status},  
                       Amount Paid: {this.props.location.state.amount}


                   </p>
         
                </form>
            </>
        )
    }
}