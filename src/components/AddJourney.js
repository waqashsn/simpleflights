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

// TODO:
// - save airport and tz info to state object in this module and app module
// - send it back to app module
// - process airport and tz info in Itinerary module


class AddJourney extends React.Component{
    state = {
        departure_date: null,
        departure_city: null,
        departure_airport: null,
        departure_airport_code: null,
        departure_tz: null,
        arrival_date: null,
        arrival_city: null,
        arrival_airport: null,
        arrival_airport_code: null,
        arrival_tz:null
        
    };
    
    dataset = require('../../node_modules/airport-codes/airports.json');

    fuse_options = {
        caseSensitive: true,
        threshold: 0.0,
        keys: ['iata'],
        // keys: ['id', 'name', "city", "country", "iata", "icao", "latitude", "longitude", "altitude", "timezone", "dst", "tz"],
        // id: 'iata'
    };

    fuse_dataset = new Fuse(this.dataset, this.fuse_options);

    //handle the change in departure date field
    handleDepartureChange = (value) => {
        console.log("Default Departure date & time: ", value);
        console.log("UTC departure date & time: ", value.toLocaleString());
        console.log("TZ converted date and time: ", moment.tz(value, "America/New_York").format());
        console.log("UTC from TZ convereted date and time: ", moment.tz(moment.tz(value, "America/New_York").toLocaleString(), "Asia/Karachi").toLocaleString());

        
        this.setState({
            departure_date: value
        })
    }

    //handle entry in departure airport code field
    handleDepartureAirportCode = (e) => {
        //if airport code entered has three letters, get airport data...
        if (e.target.value !== "" && e.target.value.length == 3) {
            // console.log("there is value of length 3");

            // create a promise to get airport data
            const get_data = new Promise((resolve, reject) => {
                const departure_airport_info = this.fuse_dataset.search(document.getElementById("input_departure_airport_code").value);
                if (departure_airport_info) {
                    resolve(departure_airport_info);
                } else {
                    reject();
                }
            });

            // get airport data using the promise
                //if data is found for the airport code entered, add it to the state object
            get_data.then((departure_airport_info) => {
                this.setState({
                    departure_city: departure_airport_info[0].city,
                    departure_airport: departure_airport_info[0].name,
                    departure_airport_code: departure_airport_info[0].iata,
                    departure_tz: departure_airport_info[0].tz,
    
                });
                console.log("Departure airport data recieved and state set!!!");
                console.log(this.state);
            }, (error) => {
                console.log("ERROR!!! ", error);
            }).catch((error) => {
                console.log("ERROR:::", error)
            })
            // console.log(this.state);

        }
    }

    // handle entry in destination airport code field 
    handleDestinationAirportCode = (e) => {
        if (e.target.value !== "" && e.target.value.length == 3) {
            const get_destination_data = new Promise((resolve, reject) => {
                const destination_airport_info = this.fuse_dataset.search(document.getElementById("input_destination_airport_code").value);
                if (destination_airport_info) {
                    resolve(destination_airport_info);
                } else {
                    reject();
                }
            });

            get_destination_data.then((destination_airport_info) => {
                this.setState({
                    arrival_city: destination_airport_info[0].city,
                    arrival_airport: destination_airport_info[0].name,
                    arrival_airport_code: destination_airport_info[0].iata,
                    arrival_tz:destination_airport_info[0].tz
                });
                console.log("Destination airport data recieved and state set!!!");
                console.log(this.state);
            }, (error) => {
                console.log("ERROR: Destination airport...", error);
            }).catch((error) => {
                console.log("ERROR: Destination airport...", error);
            })
        }
    }

    // capitalize entered value in airport codes entry fields
    handleAirportInputCapitalize = (e) =>{
        e.target.value = e.target.value.toUpperCase();
    }

    // handle change in arrival date field
    handleArrivalChange = (value) => {
        console.log("Arrival date & time:", value);
        this.setState({
            arrival_date: value
        })
    }

    // handle submission of form
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

    
    render(){
        return(
            <div>
                <div className="border p-3 bg-light">
                    <h4>Add flight</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="departure_inputx" >Departure date & time:</label><br></br>
                            <DatePicker id="departure_input" style={{width: 300}} size="large" onChange={this.handleDepartureChange} onOk={this.handleDepartureChange} className="" format="DD MMM YYYY @ HH:mm:ss" showTime placeholder="Departure date and time"/><br></br><br></br>
                            <label htmlFor="input_departure_airport_code">Departure Airport Code:</label><br></br>
                            <input className="ant-input ant-input-lg" style={{width: 300}} size="large" id="input_departure_airport_code" placeholder="Airport Code" onChange={this.handleAirportInputCapitalize} onBlur={this.handleDepartureAirportCode} /><br></br><br></br>
                            {/* <Input style={{width: 300}} size="large" id="input_departure_airport_code" placeholder="Airport Code" onChange={this.handleAirportInputCapitalize} onBlur={this.handleDepartureAirportCode} /><br></br> */}
                            <label htmlFor="arrival_input" >Arrival date & time:</label><br></br>
                            <DatePicker style={{width: 300}} id="arrival_input" size="large" onChange={this.handleArrivalChange} onOk={this.handleArrivalChange} className="" format="DD MMM YYYY @ HH:mm:ss" showTime placeholder="Arrival date and time"/><br></br><br></br>
                            <label htmlFor="input_destination_airport_code">Destination Airport Code:</label><br></br>
                            <input className="ant-input ant-input-lg" style={{width: 300}} id="input_destination_airport_code" placeholder="Aiport Code" onChange={this.handleAirportInputCapitalize} onBlur={this.handleDestinationAirportCode}/><br></br><br></br>
                            <Button className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg" onClick={this.handleSubmit}>Add Flight</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default AddJourney;