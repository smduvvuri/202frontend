import React from "react";
import { useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import axios from "axios";

let config = {
    headers: {
        authorization: JSON.parse(localStorage.getItem('auth')).result.token
    }
}

function ListHotelByLocation(){

    const location=useLocation()
    const {login} =location.state
    const[data, setData]= useState(null);
    
    console.log(login);
    

    useEffect(()=> {
        if(!login) return;

        axios.post(`${process.env.REACT_APP_API}/getAllHotels/${login}`, config)
        .then((response) => response.json())
        .then(setData)
      }, [login]);
        
    
    return (<div>
    <section>
    <Card style={{ width: '18rem' }}>
                 
                <Card.Body>
                <Card.Title>{data.hotelName}</Card.Title>
                <Card.Text>
                
                     
  
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
    </Card>
    </section>

    
    </div>
    );
}

export default ListHotelByLocation;