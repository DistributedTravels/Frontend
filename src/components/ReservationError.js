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
        reservationOK: "",
        postId: "",
        userLogged: ""

    }

    loadData = async () => {

        try {

            const myUrlWithParams = new URL(webAPI_URL + reservationROUTE);

            myUrlWithParams.searchParams.append("reservationId", searchParams.get("postId"));

            //var status = 0;

            axios.get(myUrlWithParams.href)
                .then(res => {
                    console.log(res.data);
                    this.setState({ reservationOK: res.data.reservationStatus })
                    //status = res.data.reservationStatus;
                })


            if (this.state.reservationOK === 1) {
                const parameters = {
                    postId: searchParams.get("postId"),
                    price: searchParams.get("price"),
                    promotionCode: searchParams.get("promotionCode"),
                    attempt: "1"
                }

                const myRedirectUrlWithParams = new URLSearchParams(parameters);

                window.location.href = "/payment?" + myRedirectUrlWithParams;
            }
        } catch (e) {
            console.log(e);
        }
}


    componentDidMount() {
        
        

        if (sessionStorage.getItem('user-key')) {

            this.setState({ userLogged: true });
            this.loadData();
            setInterval(this.loadData, 4000);
 
        }
        else {
            this.setState({ userLogged: false });
        }

        

        
    }

    render() {


        return (
            < div className="border list-group-item mt-1 offer h5">
                {this.state.userLogged ?
                    null :
                    <h5 style={{ color: 'red' }}> Użytkownik niezalogowany </h5>
                }
                {(this.state.reservationOK === 3) ?
                    <h5 style={{ color: 'red' }}> Błąd rezerwacji. Oferta już niedostępna </h5> :
                    (this.state.userLogged ? < h5 > Oczekiwanie ... </h5> : null)
                }
                
               </ div >
        );
    }
}

