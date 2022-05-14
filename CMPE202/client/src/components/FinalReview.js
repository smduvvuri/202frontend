
import React from 'react';
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";
import ConnectNav from "../components/ConnectNav";
import UserDashboardNav from './UserDashboardNav';
import {Redirect, Link} from "react-router-dom";

let searchResult=false;


export default class FinalReview extends React.Component {
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

     onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };



    render() {
      let redirectVar=null;

      if (this.state.message === "ok") {
        redirectVar = <Redirect to="/confirmation" />;
      } else if (this.state.message === "notok") {
        alert("Something went wrong.");
      }
        return (
          
            <>
            {redirectVar}
                <div className="container-fluid bg-secondary p-5">
                <ConnectNav/>
                </div>

                <div className="container-fluid p-4">
                <UserDashboardNav />
                </div>
                
               <form>
                   <h4>The final estimated price is ${this.props.location.state.price}
                   </h4>
                   <p>Do you want to continue?</p>
         
                <div style={{display:'flex', flexDirection:'row'}} >
                <div>
                <Link className="nav-link" to="/listHotelByLocation">
            No
          </Link>
                </div>

                <div>
                <Link to={{ 
                    
                pathname: "/payment", 
                state: {

                    amount: this.props.location.state.price,
                   bookingNumber: this.props.location.state.bookingNumber,
                   userId: this.props.location.state.userId,
                   hotelId:this.props.location.state.hotelNumber,
                   roomId:this.props.location.state.roomNumber,
                   startDate:this.props.location.state.startDate,
                   endDate:this.props.location.state.endDate,
                   guests: this.props.location.state.guests,
                   status: this.props.location.state.status,

                    
                }
                }}>
                Proceed to Payment
                </Link>
                </div>
                </div>
                </form>
            </>
        )
    }
}