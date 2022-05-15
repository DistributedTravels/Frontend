import React, { Component } from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
const webAPI_URL = "http://localhost:8090";
const offersROUTE = "/Offers/GetOffers";

import axios from 'axios';

var baseDate = "07/01/2022";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            when: baseDate+"-"+baseDate,
            departure: "Warszawa",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            previousOffers: [1,2],
            offers: [1, 4],
            mockOffers: [1, 4],
            offerId: "0",
            hotelName: "defaultHotel"
            
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

    }

    componentDidMount() {
        const myUrlWithParams = new URL(webAPI_URL + offersROUTE);

        const date = this.state.when;
        const dates = date.split("-");
        

        var start = dates[0].replaceAll("/", "-");
        start = start.replaceAll(" ", "");
        var end = dates[1].replaceAll("/", "-");
        end = end.replaceAll(" ", "");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure",  this.state.departure );
        myUrlWithParams.searchParams.append("destination", this.state.destination);
        myUrlWithParams.searchParams.append("adults", this.state.adults);
        myUrlWithParams.searchParams.append("children_under_3", this.state.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", this.state.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", this.state.children_under_18);

        axios.get(myUrlWithParams.href)
            .then(res => {

                this.setState({ previousoffers: this.state.offers });
                this.setState({ offers: res.data });

            })
        console.log(myUrlWithParams.href);

    }
    componentDidUpdate() {
        const myUrlWithParams = new URL(webAPI_URL + offersROUTE );
        const date = this.state.when;
        const dates = date.split("-");
        var start = dates[0].replaceAll("/", "-");
        start = start.replaceAll(" ", "");
        var end = dates[1].replaceAll("/", "-");
        end = end.replaceAll(" ", "");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure", this.state.departure);
        myUrlWithParams.searchParams.append("destination", this.state.destination);
        myUrlWithParams.searchParams.append("adults", this.state.adults);
        myUrlWithParams.searchParams.append("children_under_3", this.state.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", this.state.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", this.state.children_under_18);


        if (!equals(this.state.offers, this.state.previousOffers) ) {
            axios.get(myUrlWithParams.href)
                .then(res => {
                    if (!equals(this.state.offers, res.data)) {
                        this.setState({ previousOffers: this.state.offers });
                        this.setState({ offers: res.data });
                    }
                   

                })
        }
       
    }

      handleClick = offer => () => {

        const date = this.state.when;
        const dates = date.split("-");
        var start = dates[0].replaceAll("/", "-");
        start = start.replaceAll(" ", "");
        var end = dates[1].replaceAll("/", "-");
        end = end.replaceAll(" ", "");

        var id = "";
          if (offer.offerId === undefined) {
              id = "defaultId";
          } else {
              id = offer.offerId;
          }


        const parameters = {
            offerId: id,
            hotelId: offer.hotelId,
            hotelName: offer.hotelName,
            transportId: offer.transportId,
            startDate: start,
            endDate: end,
            departure: this.state.departure,
            destination: this.state.destination,
            adults: this.state.adults,
            children_under_3: this.state.children_under_3,
            children_under_10: this.state.children_under_10,
            children_under_18: this.state.children_under_18

        }

        const myUrlWithParams = new URLSearchParams(parameters);

        window.location.href = "/offerForm?" + myUrlWithParams;
    };

    render() {
        if (!equals(this.state.offers, this.state.mockOffers)) {


            return (
                <div className="border list-group-item mt-1 offer h5">
                    <h3 className="text-center mt-5">Wyniki wyszukiwania</h3>

                    <ul>
                        {
                            this.state.offers
                                .map(offer => {
                                    const dates = (offer.departureTime).split("T");
                                    var date = dates[0];
                                    var time = dates[1].replaceAll("Z", "");

                                    return (

                                        <li key={offer.id} className="border list-group-item mt-5 offer">
                                            <h4>{offer.hotelName}</h4>
                                            <h5>{offer.destination}</h5>
                                            <h5>Data: {date}</h5>
                                            <h5>Czas wyjazdu: {time}</h5>
                                            <button className="search" onClick={this.handleClick(offer)}>Sprawdź ofertę</button>

                                        </li>
                                )})
                        }
                    </ul>

                </div>

            )
        }
        else {
            return (
                <div className="border list-group-item mt-1 offer h5">
                    <h3 className="text-center mt-5">Wyniki wyszukiwania</h3>
                    <h4 className="text-center mt-5">Brak ofert przy wybranych filtrach</h4>
                </div>
                )
        }
    }
}
