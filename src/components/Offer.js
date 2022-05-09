import React, { Component } from 'react';

import axios from 'axios'

var currentDate = new Date(); //use your date here
currentDate = currentDate.toLocaleDateString('en-US'); // "en-US" gives date in US Format - mm/dd/yy

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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
            previousOffers: [1,2],
            offers: []
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


    componentDidUpdate() {
        if (!equals(this.state.offers, this.state.previousOffers)) {
            axios.get(`http://localhost:8090/Offers/GetOffers`)
                .then(res => {

                    this.setState({ previousOffers: this.state.offers });
                    this.setState({ offers: res.data });

                })
        }
       
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
                <ul>
                    {
                        this.state.offers
                            .map(offer =>
                                <li key={offer.id} className="border list-group-item mt-5 offer">
                                    <h5>{offer.hotelName}</h5>
                                    <h5>{offer.destination}</h5>

                                </li>
                            )
                    }
                </ul>

            </div>
        )
    }
}
