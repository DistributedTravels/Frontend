import React, { Component } from 'react';
const webAPI_URL = "http://localhost:8090";
const offersAvailableROUTE = "/Offers/CheckIfAvailable";

const searchParams = new URLSearchParams(window.location.search);

export class Payment extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const myUrlWithParams = new URL(webAPI_URL + offersAvailableROUTE);

        myUrlWithParams.searchParams.append("offerId", searchParams.get("offerId"));
        myUrlWithParams.searchParams.append("hotelName", searchParams.get("hotelName"));
        myUrlWithParams.searchParams.append("startDate", searchParams.get("startDate"));
        myUrlWithParams.searchParams.append("endDate", searchParams.get("endDate"));
        myUrlWithParams.searchParams.append("departure", searchParams.get("departure"));
        myUrlWithParams.searchParams.append("destination", searchParams.get("destination"));
        myUrlWithParams.searchParams.append("adults", searchParams.get("adults"));
        myUrlWithParams.searchParams.append("children_under_3", searchParams.get("children_under_3"));
        myUrlWithParams.searchParams.append("children_under_10", searchParams.get("children_under_10"));
        myUrlWithParams.searchParams.append("children_under_18", searchParams.get("children_under_18"));
        myUrlWithParams.searchParams.append("number_of_2_room", searchParams.get("number_of_2_room"));
        myUrlWithParams.searchParams.append("number_of_apartaments", searchParams.get("number_of_apartaments"));
        myUrlWithParams.searchParams.append("transport", searchParams.get("transport"));
        myUrlWithParams.searchParams.append("breakfast", searchParams.get("breakfast"));
        myUrlWithParams.searchParams.append("wifi", searchParams.get("wifi"));


        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({ offerAvailable: res.data });

        //    })
    }

    handleClick() {
        //POST  with payment

        const parameters = {
            offerId: searchParams.get("offerId"),
            hotelName: searchParams.get("hotelName"),
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
            wifi: searchParams.get("wifi")

        }

        const myUrlWithParams = new URLSearchParams(parameters);
        //window.location.href = "/payment?" + myUrlWithParams;


    };

    render() {
       

        return (
            <div>
                <h1>Zapłać</h1>
                <h3>Cena: </h3>
                <p>

                </p>

                <div>
                    <button className="reserve" onClick={this.handleClick}>Zapłać</button>
                </div>


            </div>
        );
    }
}

