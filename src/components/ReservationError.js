import React, { Component } from 'react';
import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const reservationROUTE = "/Reservation/CheckReservationStatus";

const searchParams = new URLSearchParams(window.location.search);

export class ReservationError extends Component
{


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
        reservationOK: true,
        postId: ""

    }

    componentDidMount() {
        console.log(searchParams);

       

        //GET if reservation OK

        const myUrlWithParams = new URL(webAPI_URL + reservationROUTE);

        myUrlWithParams.searchParams.append("reservationGUID", searchParams.get("postId"));
       

        axios.get(myUrlWithParams.href)
            .then(res => {
                this.setState({ reservationOK: res.data });
            })

        //UNCOMMENT THIS WHEN PAYMENT !!!!!!!!
        //const parameters = {
        //    offerId: searchParams.get("offerId"),
        //    hotelName: searchParams.get("hotelName"),
        //    hotelId: searchParams.get("hotelId"),
        //    transportId: searchParams.get("transportId"),
        //    startDate: searchParams.get("startDate"),
        //    endDate: searchParams.get("endDate"),
        //    departure: searchParams.get("departure"),
        //    destination: searchParams.get("destination"),
        //    adults: searchParams.get("adults"),
        //    children_under_3: searchParams.get("children_under_3"),
        //    children_under_10: searchParams.get("children_under_10"),
        //    children_under_18: searchParams.get("children_under_18"),
        //    number_of_2_room: searchParams.get("number_of_2_room"),
        //    number_of_apartaments: searchParams.get("number_of_apartaments"),
        //    transport: searchParams.get("transport"),
        //    breakfast: searchParams.get("breakfast"),
        //    wifi: searchParams.get("wifi"),
        //    price: searchParams.get("price"),
        //    promotionCode: searchParams.get("promotionCode"),
        //    postId: searchParams.get("postId")
        //}


        //console.log(parameters);

        //const myRedirectUrlWithParams = new URLSearchParams(parameters);

        //if (this.state.reservationOK) {
        //    window.location.href = "/payment?" + myRedirectUrlWithParams;
        //}

        
    }

    render() {


        return (
            < div className="border list-group-item mt-1 offer h5">
                {this.state.reservationOK ?
                    <h5 style={{ color: 'green' }}> Oferta dostępna </h5> :
                    <h5 style={{ color: 'red' }}> Błąd rezerwacji. Oferta już niedostępna </h5>
                }
                
               </ div >
        );
    }
}

