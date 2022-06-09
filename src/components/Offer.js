import React, { Component } from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";

import ChatForPrice from './ChatForPrice';

const webAPI_URL = "http://localhost:8090";


var baseDate = "07/01/2022";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            when: baseDate + "-" + baseDate,
            departure: "Warszawa",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            offers: [],
            beforeSearch: true
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
        this.setState({ offers: nextProps.param.offers })
        this.setState({ beforeSearch: nextProps.param.beforeSearch })

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
            children_under_18: this.state.children_under_18,
            wifiAvailable: offer.wifiAvailable,
            breakfastAvailable: offer.breakfastAvailable,
            planeAvailable: offer.planeAvailable

        }

        const myUrlWithParams = new URLSearchParams(parameters);

        window.location.href = "/offerForm?" + myUrlWithParams;
    };

    render() {


        if (!equals(this.state.offers, []) && !this.state.beforeSearch) {


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
                                            <h5>Data wyjazdu: {date}</h5>
                                            <h5>Czas wyjazdu: {time}</h5>
                                            <ChatForPrice param={offer} />
                                            <p>
                                            </p>
                                            {offer.wifiAvailable || offer.breakfastAvailable || offer.planeAvailable ? <h5> W ofercie dostępne: </h5> : null}
                                            <ul>
                                                {offer.wifiAvailable ? <li><h5> Wifi </h5></li> : null}
                                                {offer.breakfastAvailable ? <li><h5> Śniadanie </h5></li> : null}
                                                {offer.planeAvailable ? <li><h5> Samolot </h5></li> : null}
                                            </ul>
                                            
                                            <button className="search" onClick={this.handleClick(offer)}>Sprawdź ofertę</button>

                                        </li>
                                    )
                                })
                        }
                    </ul>

                </div>

            )
        }

        else if (!this.state.beforeSearch) {
            return (
                <div className="border list-group-item mt-1 offer h5">
                    <h3 className="text-center mt-5">Wyniki wyszukiwania</h3>
                    <h4 className="text-center mt-5">Brak ofert przy wybranych filtrach</h4>
                </div>
            )
        }
        else {
            return (
                <div >

                    <h4 className="text-center mt-5"></h4>
                </div>
            )
        }
    }
}