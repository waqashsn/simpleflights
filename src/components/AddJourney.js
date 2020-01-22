import React from 'react';
// import moment from 'moment';
import {DatePicker, Button} from 'antd';
import moment from 'moment-timezone';
import Fuse from 'fuse.js';
// import * as dataset from '../../node_modules/airport-codes/airports.json';
// var dataset = require('../../node_modules/airport-codes/airports.json');

// var fuse_options = {
//     caseSensitive: true,
//     threshold: 0.0,
//     keys: ['iata'],
//     // keys: ['id', 'name', "city", "country", "iata", "icao", "latitude", "longitude", "altitude", "timezone", "dst", "tz"],
//     // id: 'iata'
// }

// var fuse_dataset = new Fuse(dataset, fuse_options);

class AddJourney extends React.Component{
    dataset = require('../../node_modules/airport-codes/airports.json');

    fuse_options = {
        caseSensitive: true,
        threshold: 0.0,
        keys: ['iata'],
        // keys: ['id', 'name', "city", "country", "iata", "icao", "latitude", "longitude", "altitude", "timezone", "dst", "tz"],
        // id: 'iata'
    }

    fuse_dataset = new Fuse(this.dataset, this.fuse_options);
    
    state = {
        departure_date: null,
        arrival_date: null
    }

    handleDepartureChange = (value) => {
        console.log("Default Departure date & time: ", value);
        console.log("UTC departure date & time: ", value.toLocaleString());
        console.log("TZ converted date and time: ", moment.tz(value, "America/New_York").format());
        console.log("UTC from TZ convereted date and time: ", moment.tz(moment.tz(value, "America/New_York").toLocaleString(), "Asia/Karachi").toLocaleString());

        
        this.setState({
            departure_date: value
        })
    }

    handleArrivalChange = (value) => {
        console.log("Arrival date & time:", value);
        this.setState({
            arrival_date: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(dataset);
        const entered_departure_airport_code = document.getElementById("input_departure_airport_code").value;
        console.log(entered_departure_airport_code);
        this.fuse_dataset.search(entered_departure_airport_code);
        console.log(`Timezone of your entered airport ($entered_departure_airport_code) is: `, this.fuse_dataset.search(entered_departure_airport_code)[0].tz);


        this.props.createJourney(this.state);
        this.setState({
            departure_date: null,
            arrival_date: null
        })
    }

    handleAirportInputChange = (e) =>{
        e.target.value = e.target.value.toUpperCase();
    }
    
    render(){
        return(
            <div>
                <div className="border p-3 bg-light">
                    <h4>Add flight</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-6">
                            <label htmlFor="departure_inputx" >Departure date & time:</label><br></br>
                            <DatePicker id="departure_input" onChange={this.handleDepartureChange} onOk={this.handleDepartureChange} className="" format="DD MMM YYYY @ HH:mm:ss" showTime placeholder="Departure date and time"/><br></br>
                            <input type="text" id="input_departure_airport_code" placeholder="Airport Code" onChange={this.handleAirportInputChange} /><br></br><br></br>
                            <label htmlFor="arrival_input" >Arrival date & time:</label><br></br>
                            <DatePicker id="arrival_input" onChange={this.handleArrivalChange} onOk={this.handleArrivalChange} className="" format="DD MMM YYYY @ HH:mm:ss" showTime placeholder="Arrival date and time"/><br></br><br></br>
                            <Button onClick={this.handleSubmit}>Add Flight</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default AddJourney;