import React from 'react';
import './App.css';
import AddJourney from './components/AddJourney';
import Itinerary from './components/Itinerary';
import { Row, Col } from 'antd';

class App extends React.Component {
  // journey is an array that contains all the flights info
  
  state = {
    journey: []
  }

  createJourney = (journey) => {
    const new_journey = {
      journey_id: Math.random(),
      departure_date: journey.departure_date,
      departure_city: journey.departure_city,
      departure_airport: journey.departure_airport,
      departure_airport_code: journey.departure_airport_code,
      departure_tz: journey.departure_tz,
      arrival_date: journey.arrival_date,
      arrival_city: journey.arrival_city,
      arrival_airport: journey.arrival_airport,
      arrival_airport_code: journey.arrival_airport_code,
      arrival_tz: journey.arrival_tz
    }
    
    let updated_journey_list = [...this.state.journey, new_journey];
    
    this.setState({
      journey: updated_journey_list
    }, () => console.log(this.state))
  }

  render(){
    return(
      <div>
        <div className="page_title">SimpleFlights</div>
        <Row gutter={16}>
          <Col span={12}>
            <AddJourney createJourney={this.createJourney} />
          </Col>
          <Col span={12}>
            <div>
              <h3>Your journey</h3>
              {this.state.journey.length > 0 ? <Itinerary journey_list={this.state.journey} /> : "Add flights to start"}
              
              {/* <Itinerary journey_list={this.state.journey} /> */}
            </div>

          </Col>
        </Row>
        
      </div>
    )
  }
}


export default App;
