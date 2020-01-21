import React from 'react';
// import moment from 'moment';
import {DatePicker, Button} from 'antd';

class AddJourney extends React.Component{

    state = {
        departure_date: null,
        arrival_date: null
    }

    handleDepartureChange = (value) => {
        console.log("Departure date & time: ", value);
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
                        <div className="form-group col-md-6">
                            <label htmlFor="departure_inputx" >Departure date & time:</label><br></br>
                            <DatePicker id="departure_input" onChange={this.handleDepartureChange} onOk={this.handleDepartureChange} className="" format="DD MMM YYYY @ HH:mm:ss" showTime placeholder="Departure date and time"/><br></br>
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