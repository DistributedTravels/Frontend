import React, { Component } from 'react';
import axios from 'axios';

const webAPI_URL = "http://localhost:8090";
const myAccountROUTE = "";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export class MyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            guid: ""


        };
    }

    componentDidMount() {

      //GET guid form session storage
      // ver guid = sessionStorage.getItem('user-key')

        //const myUrlWithParams = new URL(webAPI_URL + myAccountROUTE);

        //myUrlWithParams.searchParams.append("guid", guid);
       
        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({
        //            offers: res.data
        //        });

        //    })
    }

    render() {
        if (!equals(this.state.offers, [])) {

            return (
                <div>
                    <h1>Twoja historia</h1>

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

                    <h3 className="text-center mt-5">Brak historii</h3>
                </div>
            )
        }
    }
}
