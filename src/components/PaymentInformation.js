﻿import React, { Component } from 'react';
const webAPI_URL = "http://localhost:8090";
const paymentROUTE = "/Offers/GetPaymentStatus";
import axios from 'axios';

const searchParams = new URLSearchParams(window.location.search);

export class PaymentInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        offerId: "",
        hotelName: "",
        hotelId: "",
        transportId: "",
        startDate: "",
        endDate: "",
        departure: "",
        destination: "",
        adults: "",
        children_under_3: "",
        children_under_10: "",
        children_under_18: "",
        number_of_2_room: "",
        number_of_apartaments: "",
        transport: "",
        breakfast: "",
        wifi: "",
        price: "",
        promotionCode: "",
        paymentSucceeded: false

    }

    componentDidMount() {
        console.log(searchParams);

        const parameters = {
            offerId: searchParams.get("offerId"),
            hotelName: searchParams.get("hotelName"),
            hotelId: searchParams.get("hotelId"),
            transportId: searchParams.get("transportId"),
            startDate: searchParams.get("startDate"),
            endDate: searchParams.get("endDate"),
            departure: searchParams.get("departure"),
            destination: searchParams.get("destination"),
            adults: searchParams.get("adults"),
            children_under_3: searchParams.get("children_under_3"),
            children_under_10: searchParams.get("children_under_10"),
            children_under_18: searchParams.get("children_under_18"),
            number_of_2_room: searchParams.get("number_of_2_room"),
            number_of_apartaments: searchParams.get("number_of_apartaments"),
            transport: searchParams.get("transport"),
            breakfast: searchParams.get("breakfast"),
            wifi: searchParams.get("wifi"),
            price: searchParams.get("price"),
            promotionCode: searchParams.get("promotionCode")
        }


        //GET if payment OK

        const myUrlWithParams = new URL(webAPI_URL + paymentROUTE);

        // tu dodawać
        //myUrlWithParams.searchParams.append("startDate", start);


        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({ paymentSucceeded: res.data });
       
        //    })


    }

    render() {
        let information;
        if (this.state.paymentSucceeded) {
            information = <h5 style={{ color: 'green' }}> Płatność przezła pomyślnie. Oferta zarezerwowana. </h5>
        } else {
            information = <h5 style={{ color: 'red' }}> Płatność nie przeszła pomyślnie. Oferta niezarezerwowana. </h5>
        }

        return (

            <div className="border list-group-item mt-1 offer h5">
                {information}
            </div>
        )
    }
}
