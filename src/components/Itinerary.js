import React from 'react';
import moment from 'moment';

function Itinerary(props){
    const journey_list = props.journey_list;
    const itinerary = journey_list.map((journey, index, arr)=>{
        const has_previous_flights = index > 0 ? true : false;
        const departure_dateTime = journey.departure_date;
        const arrival_dateTime = journey.arrival_date;
        const flight_duration = moment.duration(arrival_dateTime.diff(departure_dateTime));

        const previous_leg_index = has_previous_flights ? (index - 1) : null;
        const previous_journey_arrival = has_previous_flights ? (arr[index - 1].arrival_date) : null;
        const rest_duration = has_previous_flights ? moment.duration(departure_dateTime.diff(previous_journey_arrival)).asHours() : null;

        return(
            <div key={journey.journey_id}>
                <p>Depart on: {departure_dateTime.format()}, reach on: {arrival_dateTime.toLocaleString()}.</p>
                <p>Flight duration is {flight_duration.asHours()}.</p>
                {has_previous_flights ? "Rest for " + rest_duration: ""}

            </div>
        )
    })

    return(
        <div>
            {itinerary}
        </div>
    )
}

export default Itinerary;