import {useState} from "react";
import RegisterForm from "../components/AddHotelForm";
import React from 'react';
import Table from "../components/Table"

import axios from "axios";
import {toast} from "react-toastify";
import {addhotel} from "../actions/admin";
import ConnectNav from "../components/ConnectNav";
import AdminHotelNav from "../components/AdminHotelNav";
import {Link} from "react-router-dom";

let config = {
    headers: {
        authorization: JSON.parse(localStorage.getItem('auth')).result.token
    }
}

// const listItems;

export default class AllHotels extends React.Component {
    state = {
        hotels: []
    }

    // export const addhotel = async (hotel) =>
    //     await axios.post(`${process.env.REACT_APP_API}/addHotel`, hotel, config);

    componentDidMount() {
        axios.post(`${process.env.REACT_APP_API}/getAllHotels`, config)
            .then(res => {
                const hotels = res.data.hotels;

                console.log(hotels);
                this.setState({hotels});
            })
        console.log(this.state.hotels);
    }



    // const listItems = this.state.hotels.map((hotels) => <li>{hotels}</li>);

    render() {
        return (
            <>
                <div className="container-fluid bg-secondary p-5">
                    <ConnectNav/>
                </div>


                <div className="container-fluid p-4">
                    <AdminHotelNav/>
                </div>

                {/*<div>*/}
                {/*    <Table data={this.state.hotels}/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <ul>*/}
                {/*        {*/}
                {/*            this.state.hotels.map(hotel =>*/}
                {/*                <li key={hotel.hotelNumber}>*/}
                {/*                    {hotel.hotelName}*/}
                {/*                </li>)*/}
                {/*        }*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div>
                    <center>
                        <table>
                            <tr>
                                {/*<div className="form-group mb-3">*/}
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Hotel#</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Name</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Description</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Location</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Address</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Breakfast</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Meal</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Gym</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Pool</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Parking</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Base</label>
                                    </th>
                                    <th style={{width: '120px'}}>
                                        <label className="form-label">Weekend</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Holiday</label>
                                    </th>
                                    <th style={{width: '100px'}}>
                                        <label className="form-label">Season</label>
                                    </th>

                                {/*</div>*/}
                            </tr>
                            {
                                this.state.hotels.map(hotel =>
                                    <tr>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelNumber}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelName}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelDescription}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelLocation}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelAddress}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.breakfast}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.meal}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.gym}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.pool}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.parking}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.hotelCharge}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.weekendCharge}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.holidayCharge}
                                        </td>
                                        <td style={{width: '100px'}} key={hotel.hotelNumber}>
                                            {hotel.seasonCharge}
                                        </td>
                                    </tr>)
                            }

                        </table>
                    </center>
                </div>


            </>
        )
    }
}
