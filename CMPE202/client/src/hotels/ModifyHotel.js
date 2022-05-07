import React from 'react';
// import { Button } from "react-bootstrap";
import axios from "axios";
import AdminHotelNav from "../components/AdminHotelNav";
import ConnectNav from "../components/ConnectNav";
import {Button} from "antd";


let config = {
  headers: {
    authorization: JSON.parse(localStorage.getItem('auth')).result.token
  }
}

let searchResult=false;

export default class ModifyHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      message: "",
      isSafe: false,
      hotels: [],
    };

  }


  onChange = (e) => {
    console.log("in on change method");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.hotelLocation);
    let data = {
      hotelLocation: this.state.hotelLocation,
    };

    console.log(data);

    axios.post(`${process.env.REACT_APP_API}/getHotelFromLocation`, data, config).then((response) => {
      console.log(response.data.message);
      if (response.data) {
        searchResult=true;
        console.log(searchResult);
        this.setState({
          message: response.data.message,
        });
      }
    });

  };

  componentDidMount() {
    axios.post(`${process.env.REACT_APP_API}/getAllHotels`, config)
        .then(res => {
          const hotels = res.data.hotels;
          console.log(hotels);
          this.setState({hotels});
        })
    console.log(this.state.hotels);
  }




  render() {

    console.log(this.props);

    return (
        <>
          <div className="container-fluid bg-secondary p-5">
            <ConnectNav />
          </div>


          <div className="container-fluid p-4">
            <AdminHotelNav />
          </div>

          <form onSubmit={this.onSubmit} className="mt-3">
            {/*<div style={{display:'flex', flexDirection:'row'}}>*/}

            <table >
              <tr>
                <div className="form-group mb-3">
                  <td style={{width: '250px'}}>
                    <label className="form-label">Hotel Number</label>
                  </td>
                  <td style={{width: `400px`}}>
                    <select
                        name='hotelLocation'
                        onChange={this.onChange}
                        value={this.state.fields["hotelLocation"]}
                        required>
                      {this.state.hotels.map((i) => {
                        return (
                            <option value={i.hotelLocation} key={i.hotelLocation}>
                              {i.hotelLocation}
                            </option>
                        );
                      })}
                    </select>
                  </td>
                </div>
              </tr>
            </table>



              <div className="registerButton">
                <Button type="submit">
                  Search
                </Button>
              </div>

            {/*</div>*/}
          </form>

          {(searchResult)? <p> True</p> : <p>False</p> }


        </>
    )
  }
}