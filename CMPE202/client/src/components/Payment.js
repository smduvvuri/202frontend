
import React from 'react';
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";
import ConnectNav from "../components/ConnectNav";
import UserDashboardNav from './UserDashboardNav';
import {Redirect, Link} from "react-router-dom";

let searchResult=false;


export default class Payment extends React.Component {
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
          status:"",
          cardnumber:"",
          expirymonth:"",
          expiryyear:"",
          cvv:"",
        
        };
       console.log(props.location.state)
  
      }

     onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios.post(`${process.env.REACT_APP_API}/getAllHotels`, {
        headers: {
            authorization: JSON.parse(localStorage.getItem('auth')).result.token
        }
    }).then(res => {
            const hotels = res.data.hotels;
            this.setState({hotels});
        })
    console.log(this.state.hotels);
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

                <div className="form-group" style={{display:'flex', flexDirection:'row'}}>
                <label>Enter Card Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Card"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.fields["cardnumber"]}
                />

                <label>Enter Expiry Month</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expiry Month"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.fields["expirymonth"]}
                />

                <label>Enter Expiry Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expiry Year"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.fields["expiryyear"]}
                />

                <label>Enter CVV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CVV"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.fields["cvv"]}
                />
                </div>

                <Link to={{ 
                    
                    pathname: "/confirmation", 
                    state: {
                       amount: this.props.location.state.amount,
                       bookingNumber: this.props.location.state.bookingNumber,
                       userId: this.props.location.state.userId,
                       hotelId:this.props.location.state.hotelId,
                       roomId:this.props.location.state.roomId,
                       startDate:this.props.location.state.startDate,
                       endDate:this.props.location.state.endDate,
                       guests: this.props.location.state.guests,
                       status: this.props.location.state.status,       
                    }
                    }}>
                     <h4 style={{color:'cornflowerblue', textAlign:'center', marginTop:'20px'}}>Pay</h4>
                    </Link>




            </>
        )
    }
}