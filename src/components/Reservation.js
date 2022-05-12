import React, { Component } from 'react';
const webAPI_URL = "http://localhost:8090";
const offersAvailableROUTE = "/Offers/CheckIfAvailable";

const searchParams = new URLSearchParams(window.location.search);

export class Reservation extends Component {


    constructor(props) {
        super(props);
    }

    state = {
        offerId: "",
        hotelName: "",
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
        offerAvailable : true

    }

    componentDidMount() {
        this.setState({
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
        });

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

        //GET if offer is available 
        // !!!!!!!! uncomment if API is ready

        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({ offerAvailable: res.data });

        //    })

    }
    
    handleClick() {
        //POST  z rezerwacją
       
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
        window.location.href = "/payment?" + myUrlWithParams;

        
    };

    render() {
        let button;
        let information;
        if (this.state.offerAvailable) {
            information = <h5 style={{ color: 'green' }}> Oferta dostępna </h5>
            button = <button className="reserve" onClick={this.handleClick}>Rezerwuj</button>
        } else {
            button = <button className="Disabled">Rezerwuj</button>
            information = <h5 style={{ color: 'red' }}> Oferta niedostępna </h5>
        }

        return (
            <div>
                <h1>Zarezerwuj</h1>
                <h5>Termin: {this.state.startDate} - {this.state.endDate} </h5>
                <h5>Miejsce docelowe: {this.state.destination}</h5>
                <h5>Miejsce wyjazdu: {this.state.departure}</h5>
                <h5>Liczba dorosłych: { this.state.adults}</h5>
                <h5>Liczba dzieci w wieku do 3 lat: {this.state.children_under_3}</h5>
                <h5>Liczba dzieci w wieku do 10 lat: {this.state.children_under_10}</h5>
                <h5>Liczba dzieci w wieku do 18 lat: {this.state.children_under_18}</h5>
                <h5>Numer oferty: {this.state.offerId}</h5>
                <h5>Nazwa hotelu: {this.state.hotelName}</h5>
                <p>

                </p>
                
                <h5>Liczba pokojów 2-osobowych: {this.state.number_of_2_room}</h5>
                <h5>Liczba apartamentów: {this.state.number_of_apartaments}</h5>
                <h5>Śniadanie: {this.state.breakfast}</h5>
                <h5>Wifi: {this.state.wifi}</h5>
                <h5>Transport: {this.state.transport}</h5>
                <p>

                </p>
                <h3>Cena: </h3>
                <p>

                </p>

                <div>
                    {information}
                    <p>

                    </p>
                    {button}
                </div>
                
                
            </div>
        );
    }
}

