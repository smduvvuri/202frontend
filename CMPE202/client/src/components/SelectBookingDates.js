
import React from 'react';
import axios from "axios";
import ConnectNav from "../components/ConnectNav";
import UserDashboardNav from './UserDashboardNav';
import {Link} from "react-router-dom";
import moment from "moment";

let searchResult=false;


export default class SelectBookingDates extends React.Component {
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
          startDate:"",
          endDate:"",
        };
       console.log(props.location.state)
       this.state.hotelNumber=props.location.state;
      }

      onChange = (e) => {
        console.log("in on change method");
        this.setState({
          [e.target.name]: e.target.value,
        });
        
      };
     

      onSubmit = (e) => {
        e.preventDefault();
        let data = {
            hotelNumber: this.state.hotelNumber,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            types: this.state.types
          };
          console.log(data);
  
          //update API
          axios.post(`${process.env.REACT_APP_API}/getRoomFromHotel`, data,  {
            headers: {
                authorization: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).result.token: ""
            }
        }).then((response) => {
            if (response.data) {
                searchResult=true;
                const rooms = response.data.rooms;
                this.setState({rooms});
            }
          });        
      };

    
    render() {
        if(this.state.startDate===null || this.state.endDate===null)
        searchResult=false;
        return (
            
            <>
                <div className="container-fluid bg-secondary p-5">
                <ConnectNav/>
                </div>

                <div className="container-fluid p-4">
                <UserDashboardNav />
                </div>
               

                <form onSubmit={this.onSubmit} className="mt-3">
                <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter Start Date"
                  name="startDate"
                  onChange={this.onChange}
                  value={this.state.fields['startDate']}
                  max={moment().format("YYYY-MM-DD")}
                />
                </div>

                <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter End Date"
                  name="endDate"
                  onChange={this.onChange}
                  value={this.state.fields['endDate']}
                  max={moment().format("YYYY-MM-DD")}
                />

<div>
        <label> Room Type</label>
  
        
          <select name='types'
                  onChange={this.onChange}
                  value={this.state.fields["types"]}
                  required>        
            <option value='single'>
              Single
            </option>
            <option value='suite'>
              Suite
            </option>
            <option value='double'>
              Double
            </option> 
          </select>
      
      </div>
                </div>

                    <button className="btn btn-primary" disabled={!this.state.startDate || !this.state.endDate || !this.state.types}>
                    Submit
                    </button>
                </form>

                {(searchResult)?   <div className="App">
        <table>
        <tr>
          <th style={{width: '150px'}}>Hotel Number</th> <br></br>
          <th style={{width: '150px'}}>Room Number</th><br></br>
          <th style={{width: '150px'}}>Room Base Price</th><br></br>
          <th style={{width: '150px'}}>Room Type</th><br></br>
          <th style={{width: '150px'}}>Type Charge</th><br></br>
          <th style={{width: '150px'}}>Room Image</th>
          <th style={{width: '150px'}}>Room Current Price</th>
          <th style={{width: '150px'}}>Room Description</th>
          <th style={{width: '150px'}}></th>
        </tr>
        {this.state.rooms.map((val, key) => {
          return (
            <tr key={val.hotelNumber}>
              <td style={{width: '150px'}}>{val.hotelNumber}</td><br></br>
              <td style={{width: '150px'}}>{val.roomNumber}</td><br></br>
              <td style={{width: '150px'}}>{val.roomBasePrice}</td><br></br>
              <td style={{width: '150px'}}>{val.type}</td><br></br>
              <td style={{width: '150px'}}>{val.typeCharge}</td><br></br>
              <td style={{width: '150px'}}>{val.currentPrice}</td>
              <td style={{width: '150px'}}>{val.description}</td>
              <td>

                <Link to={{ 
                pathname: "/viewroomsbyhotel", 
                state: {roomNumber: val.roomNumber,
                    hotelNumber: val.hotelNumber,
                    roomBasePrice: val.roomBasePrice,
                    type: val.type,
                    typeCharge: val.typeCharge,
                    currentPrice: val.currentPrice,
                    description: val.description,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                } 
                }}>
                Book Room
                </Link>

              </td>
            </tr>
          )
        })}
      </table>
      
    </div> : <p></p> }
                
            </>
        )
    }
}