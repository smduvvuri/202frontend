import React, {useState} from 'react';

import axios from "axios";
import AdminHotelNav from "../components/AdminHotelNav";
import ConnectNav from "../components/ConnectNav";
import BookingNav from "../components/BookingNav";
import {Button} from "antd";
import RegisterForm from "../components/AddHotelForm";
import {toast} from "react-toastify";

let searchResult=false;

export default class ModifyBooking extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      message: "",
      isSafe: false,
      bookings: [],
      booking: {}
    };

  }


  onChange = (e) => {
    console.log("in on change method");
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.hotelNumber);
    let data = {
      bookingNumber: (this.state.bookingNum)?this.state.bookingNum:this.state.booking.bookingNumber,
      userId: this.state.userId,
      hotelId: this.state.hotelId,
      roomId: this.state.roomId,
      amount: this.state.amount,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      guests: this.state.guests,
      status: this.state.status

    };

    // console.log(data);

    axios.post(`${process.env.REACT_APP_API}/updateBooking`, data, {
      headers: {
        authorization:  JSON.parse(localStorage.getItem('auth')).result.token
      }
    }).then((response) => {

      console.log(response.data);
      if (response.data) {
        // searchResult=true;
        // // console.log(searchResult);
        // this.setState({
        //   hotel: response.data.hotel,
        // });
        toast.success("Booking Updated Successfully");
        console.log("updated ");
      }
    });

  };

  onClick = (e) => {
    e.preventDefault();
    // console.log(this.state.hotelNumber);
    let data = {
      bookingNumber: this.state.bookingNumber,
    };

    // console.log(data);

    axios.post(`${process.env.REACT_APP_API}/getBookingFromBookingNumber`, data, {
      headers: {
        authorization: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).result.token
      }
    }).then((response) => {
      console.log(response.data.booking);
      if (response.data) {
        searchResult=true;
        // console.log(searchResult);
        this.setState({
          booking: response.data.booking[0]
        },  () => {
          console.log(response.data.booking);
          console.log("response \n"+this.state.booking.bookingNumber);
        });

      }
    });

  };

  componentDidMount() {
    let data = {
      userId: JSON.parse(localStorage.getItem('auth')).result.userId
    };

    axios.post(`${process.env.REACT_APP_API}/getBookingFromUserId`, data, {
      headers: {
        authorization:  JSON.parse(localStorage.getItem('auth')).result.token
      }
    })
        .then(res => {
          const bookings = res.data.bookings;

          console.log(bookings);
          this.setState({bookings});
        })
    console.log(this.state.bookings);
  }




  render() {

    console.log(this.props);

    return (
        <>
          <div className="container-fluid bg-secondary p-5">
            <ConnectNav />
          </div>


          <div className="container-fluid p-4">
            <BookingNav />
          </div>

          <form onSubmit={this.onSubmit} className="mt-3">
            {/*<div style={{display:'flex', flexDirection:'row'}}>*/}

            <center>
              <table >
                <tr>
                  <div className="form-group mb-3">
                    <td style={{width: '150px'}}>
                      <label className="form-label">Booking Number</label>
                    </td>
                    <td style={{width: `150px`}}>
                      <select style={{width: `150px`}}
                          name='bookingNumber'
                          onChange={this.onChange}
                          value={this.state.fields["bookingNumber"]}
                          required>
                        <option value="please select" key="please select">
                          Please Select
                        </option>
                        {this.state.bookings.map((i) => {
                          return (
                              <option value={i.bookingNumber} key={i.bookingNumber}>
                                {i.bookingNumber}
                              </option>
                          );
                        })}
                      </select>
                    </td>
                    <td style={{width: '150px'}}>
                      <center><button  className="btn btn-primary" onClick={this.onClick}>
                        Show
                      </button></center>
                    </td>
                  </div>
                </tr>
              </table>
            </center>
          </form>

              {/*<div >*/}
              {/*  <Button type="submit" className="btn btn-primary">*/}
              {/*    Search*/}
              {/*  </Button>*/}
              {/*</div>*/}



            {/*</div>*/}


          {/*{(searchResult)? <p> True</p> : <p>False</p> }*/}


          <form onSubmit={this.onSubmit} className="mt-3">
            <center>
            <table >
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Booking Number</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name='bookingNum'
                        type="text"
                        className="form-control"
                        placeholder="Enter Booking Number For Reference"
                        defaultValue={this.state.booking.bookingNumber}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">User Id</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name='userId'
                        type="text"
                        className="form-control"
                        placeholder="Enter User Id"
                        defaultValue={this.state.booking.userId}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Hotel Id</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "hotelId"
                        type="text"
                        className="form-control"
                        placeholder="Enter Hotel Id"
                        defaultValue={this.state.booking.hotelId}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Room Id</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "roomId"
                        type="text"
                        className="form-control"
                        placeholder="Enter Room Id"
                        defaultValue={this.state.booking.roomId}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Start Date</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "startDate"
                        type="text"
                        className="form-control"
                        placeholder="Enter Start Date"
                        defaultValue={(this.state.booking.startDate)}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">End Date</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "endDate"
                        type="text"
                        className="form-control"
                        placeholder="Enter End Date"
                        defaultValue={(this.state.booking.endDate)}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Guests</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "guests"
                        type="text"
                        className="form-control"
                        placeholder="Enter Total Guests"
                        defaultValue={this.state.booking.guests}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Amount</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "amount"
                        type="text"
                        className="form-control"
                        placeholder="Enter Booking Amount"
                        defaultValue={this.state.booking.amount}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Status</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <input
                        name = "status"
                        type="text"
                        className="form-control"
                        placeholder="Enter Booking Status"
                        defaultValue={this.state.booking.status}
                        onChange={this.onChange}
                    />
                  </td>
                </div>
              </tr>



            </table>


            <button className="btn btn-primary">
              Update
            </button>
            </center>
          </form>



        </>
    )
  }
}