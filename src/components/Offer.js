import React, { Component } from 'react';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api.js'
import axios from 'axios'

var currentDate = new Date(); //use your date here
currentDate = currentDate.toLocaleDateString('en-US'); // "en-US" gives date in US Format - mm/dd/yy

export class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            when: currentDate + "-" + currentDate,
            departure: "Warszawa",
            destination: "wszędzie",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            breakfast: "Nie",
            wifi: "Nie",
            offers: { 'trips': []}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ when: nextProps.param.when })
        this.setState({ departure: nextProps.param.departure })
        this.setState({ destination: nextProps.param.destination })
        this.setState({ adults: nextProps.param.adults })
        this.setState({ children_under_3: nextProps.param.children_under_3 })
        this.setState({ children_under_10: nextProps.param.children_under_10 })
        this.setState({ children_under_18: nextProps.param.children_under_18 })
        this.setState({ breakfast: nextProps.param.breakfast })
        this.setState({ wifi: nextProps.param.wifi })

        //const num = Number(this.state.adults);
        //const num2 = Number(this.state.children_under_18);
        //this.sum = num + num2;

       
    }

    componentWillMount() {
        
        var date = this.state.when.split("-");
        var startDate = new Date(date[0]);
        var endDate = new Date(date[1]);
        
        const searchParams = new URLSearchParams();
        
        searchParams.append("startDate", startDate);
        searchParams.append("endDate", endDate);
        searchParams.append("departure", this.state.departure);
        searchParams.append("destination", this.state.destination);
        searchParams.append("adults", this.state.adults);
        searchParams.append("childrenUnder3", this.state.children_under_3);
        searchParams.append("childrenUnder10", this.state.children_under_10);
        searchParams.append("childrenUnder18", this.state.children_under_18);

        //fetch data
        createAPIEndpoint(ENDPOINTS.offers).fetch().then((res) => {
            this.setState({ offers: res.data });
        });
    }

    render() {

     
        return (
            
            <div className="border list-group-item mt-1 offer h5">
              
                <h3 className="text-center mt-5">Wyniki wyszukiwania</h3>
                <h2 > Liczba dorosłych: {this.state.adults}  </h2>
                <h2> Kierunek: {this.state.destination}</h2>
                <h2> Miejsce wyjazdu: {this.state.departure}</h2>
                <h2> Termin: {this.state.when}</h2>
                <h2> Śniadanie: {this.state.breakfast}</h2>
                <h2> Wifi: {this.state.wifi}</h2>
                <ul className="list-group">
                    {
                        this.state.offers.trips.map(
                            offer =>
                                <li key={offer.destinations} className="border list-group-item mt-5 offer">
                                    
                                    <h5> {offer.hotelName} </h5>
                                    </li>
                        )
                    }

                </ul>

            </div>
        )
    }
}
