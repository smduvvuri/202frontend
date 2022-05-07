
import React from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";
import ConnectNav from "../components/ConnectNav";

let searchResult=false;

export default class ListHotels extends React.Component {
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
        
          axios.post(`${process.env.REACT_APP_API}/getHotelFromLocation`, data, {
              headers: {
                  authorization: JSON.parse(localStorage.getItem('auth')).result.token
              }
          }).then((response) => {
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
        axios.post(`${process.env.REACT_APP_API}/getAllHotels`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('auth')).result.token
            }
        })
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
                    <ConnectNav/>
                </div>
            <form onSubmit={this.onSubmit}>
                <div style={{display:'flex', flexDirection:'row'}}>
                
                <label id="label">Select Location</label>
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

           <div className="registerButton">
                <Button type="submit">
                  Search
                </Button>
              </div>
 
           </div>
           </form>

           {(searchResult)? <p> True</p> : <p>False</p> }

           
            </>
        )
    }
}