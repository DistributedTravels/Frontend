import React, { Component } from 'react';
import axios from 'axios';

import ChatForAccount from './ChatForAccount';

const webAPI_URL = "http://localhost:8090";
const myAccountROUTE = "/Reservation/GetReservations";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export class MyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        };
    }

    componentDidMount() {

        let ss = sessionStorage.getItem('user-key');
        if (!(ss === null)) {
            ss = JSON.parse(ss);
        }

        const myUrlWithParams = new URL(webAPI_URL + myAccountROUTE);

        myUrlWithParams.searchParams.append("userId", ss.guid);
       
        axios.get(myUrlWithParams.href)
            .then(res => {
                this.setState({
                    reservations: res.data
                });

            })
    }

    render() {
        if (!equals(this.state.offers, [])) {

            return (
                <div>
                    <h1>Twoje rezerwacje</h1>

                    <ul>
                        {
                            this.state.reservations
                                .map(reservation => {
                                    const beginDates = (reservation.beginDate).split("T");
                                    var beginDate = beginDates[0];
                                   
                                    const endDates = (reservation.endDate).split("T");
                                    var endDate = endDates[0];

                                    return (

                                        <li className="border list-group-item mt-5 offer">
                                            <h5>Hotel: {reservation.hotelName}</h5>
                                            <h5>Miejsce docelowe: {reservation.destination}</h5>
                                            <h5>Miejsce wyjazdu: {reservation.departure}</h5>
                                            <h5>Data: {beginDate} - {endDate}</h5>
                                            <h5>Liczba osób dorosłych: {reservation.adults}</h5>
                                            <h5>Liczba dzieci w wieku do 3 lat: {reservation.childrenUnder3}</h5>
                                            <h5>Liczba dzieci w wieku do 10 lat: {reservation.childrenUnder10}</h5>
                                            <h5>Liczba dzieci w wieku do 18 lat: {reservation.childrenUnder18}</h5>
                                            <h5>Liczba pokojów 2-osobowych: {reservation.smallRooms}</h5>
                                            <h5>Liczba apartamentów: {reservation.bigRooms}</h5>
                                            {reservation.hasOwnTransport ? <h5>Transport: Dojazd własny</h5> : <h5>Transport: Samolot</h5>}
                                            <h5>Status: {reservation.status}</h5>
                                            <ChatForAccount param={reservation}/>
                                            
                                        </li>
                                    )
                                })
                        }
                    </ul>

                </div>

            )
        }
        else {
            return (
                <div className="border list-group-item mt-1 offer h5">

                    <h3 className="text-center mt-5">Brak historii rezerwacji</h3>
                </div>
            )
        }
    }
}
