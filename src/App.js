import React from 'react';
import './App.css';
import AddJourney from './components/AddJourney';
import Itinerary from './components/Itinerary';

class App extends React.Component {
  // journey is an array that contains all the flights info
  
  state = {
    journey: []
  }

  createJourney = (journey) => {
    const new_journey = {
      journey_id: Math.random(),
      departure_date: journey.departure_date,
      arrival_date: journey.arrival_date
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
        <AddJourney createJourney={this.createJourney} />
        <Itinerary journey_list={this.state.journey} />
      </div>
    )
  }
}


export default App;
