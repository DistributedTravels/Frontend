import React, { Component } from 'react';

const searchParams = new URLSearchParams(window.location.search);

export class Reservation extends Component {


    constructor(props) {
        super(props);
    }

    state = {
        startDate: "",
        endDate: "",
        departure: "",
        destination: "",
        adults: "",
        children_under_3: "",
        children_under_10: "",
        children_under_18: "",
        offerId: "",
        hotelName: "",
        number_of_2_room: "",
        number_of_apartaments: "",
        transport: "",
        breakfast: "",
        wifi: ""

    }


    componentDidMount() {
        this.setState({
            startDate: searchParams.get("startDate"),
            endDate: searchParams.get("endDate"),
            departure: searchParams.get("departure"),
            destination: searchParams.get("destination"),
            adults: searchParams.get("adults"),
            children_under_3: searchParams.get("children_under_3"),
            children_under_10: searchParams.get("children_under_10"),
            children_under_18: searchParams.get("children_under_18"),
            offerId: searchParams.get("offerId"),
            hotelName: searchParams.get("hotelName"),
            number_of_2_room: searchParams.get("number_of_2_room"),
            number_of_apartaments: searchParams.get("number_of_apartaments"),
            transport: searchParams.get("transport"),
            breakfast: searchParams.get("breakfast"),
            wifi: searchParams.get("wifi")
        });

      
    }

    render() {
        return (
            <div>
                <h1>Zarezerwuj</h1>
                <h5>od {this.state.startDate}</h5>
                <h5>do { this.state.endDate}</h5>
                <h5>departure {this.state.departure}</h5>
                <h5>destination {this.state.destination}</h5>
                <h5>adults { this.state.adults}</h5>
                <h5>children_under_3 {this.state.children_under_3}</h5>
                <h5>children_under_10 {this.state.children_under_10}</h5>
                <h5>children_under_18 {this.state.children_under_18}</h5>
                <h5>offerId {this.state.offerId}</h5>
                <h5>hotelName {this.state.hotelName}</h5>
                <h5>

                </h5>
                
                <h5>number_of_2_room{this.state.number_of_2_room}</h5>
                <h5>number_of_apartaments{this.state.number_of_apartaments}</h5>
                <h5>breakfast{this.state.breakfast}</h5>
                <h5>wifi {this.state.wifi}</h5>
                <h5>transport{this.state.transport}</h5>
                
            </div>
        );
    }
}

