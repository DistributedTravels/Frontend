import React, { Component } from 'react';

import axios from 'axios';

const searchParams = new URLSearchParams(window.location.search);

const webAPI_URL = "http://localhost:8090";
const reservationROUTE = "/Reservation/CheckReservationStatus";
export class PaymentInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        //offerId: "",
        //hotelName: "",
        //hotelId: "",
        //transportId: "",
        //startDate: "",
        //endDate: "",
        //departure: "",
        //destination: "",
        //adults: "",
        //children_under_3: "",
        //children_under_10: "",
        //children_under_18: "",
        //number_of_2_room: "",
        //number_of_apartaments: "",
        //transport: "",
        //breakfast: "",
        //wifi: "",
        paymentSucceeded: "",
        postId: ""

    }

    loadData = async () => {

        try {

            const myUrlWithParams = new URL(webAPI_URL + reservationROUTE);

            myUrlWithParams.searchParams.append("reservationId", searchParams.get("postId"));

            axios.get(myUrlWithParams.href)
                .then(res => {
                    console.log(res.data);
                    this.setState({ paymentSucceeded: res.data.reservationStatus })
                    
                })

            if (this.state.paymentSucceeded === 1) {
                const parameters = {
                    postId: searchParams.get("postId"),
                    price: searchParams.get("price"),
                    promotionCode: searchParams.get("promotionCode"),
                    attempt: searchParams.get("attempt") + 1
                }

                const myRedirectUrlWithParams = new URLSearchParams(parameters);

                window.location.href = "/payment?" + myRedirectUrlWithParams;
            }

        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        console.log(searchParams);

        this.loadData();
        setInterval(this.loadData, 4000);

    }

    render() {
        let information;
        if (this.state.paymentSucceeded === 2) {
            information = <h5 style={{ color: 'green' }}> Płatność przeszła pomyślnie. Oferta zarezerwowana. </h5>
        } else if (this.state.paymentSucceeded === 3) {
            information = <h5 style={{ color: 'red' }}> Płatność nie przeszła pomyślnie. Oferta niezarezerwowana. </h5>
        }
        else {
            information = <h5> Oczekiwanie ... </h5 >
        }

        return (

            <div className="border list-group-item mt-1 offer h5">
                {information}
            </div>
        )
    }
}
