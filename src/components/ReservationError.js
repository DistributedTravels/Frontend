import React, { Component, useEffect  } from 'react';
import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const reservationROUTE = "/Reservation/CheckReservationStatus";

const searchParams = new URLSearchParams(window.location.search);

async function check() {
    //GET if reservation OK

    const myUrlWithParams = new URL(webAPI_URL + reservationROUTE);

    myUrlWithParams.searchParams.append("reservationId", searchParams.get("postId"));

    var status = 0;

    axios.get(myUrlWithParams.href)
        .then(res => {
            this.setState({ reservationOK: res.data.reservationStatus });
            status = res.data.reservationStatus;
        })


    if (status === 1) {
        const parameters = {
            postId: searchParams.get("postId")
        }

        const myRedirectUrlWithParams = new URLSearchParams(parameters);

        if (this.state.reservationOK) {
            window.location.href = "/payment?" + myRedirectUrlWithParams;
        }
    }

}

useEffect(() => {
    check();

}, []);
setInterval(check, 4000);
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

    

   

    componentDidMount() {
        console.log(searchParams);
        useEffect();

        if (sessionStorage.getItem('user-key')) {

            this.setState({ userLogged: true });
 
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
                {this.state.reservationOK === 3 ?
                    <h5 style={{ color: 'red' }}> Błąd rezerwacji. Oferta już niedostępna </h5> :
                    null
                }
                
               </ div >
        );
    }
}

