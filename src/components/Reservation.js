import React, { Component } from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
const webAPI_URL = "http://localhost:8090";
const offersAvailableROUTE = "/Offers/CheckIfAvailable";
const reserveROUTE = "/Offers/Reserve";

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
        offerAvailable : true,
        price: "niedostępna",
        promotionCode: "brak kodu rabatowego"

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
            wifi: searchParams.get("wifi"),
            price: "niedostępna"
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

        //GET price
        // !!!!!!!! uncomment if API is ready

        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({ price: res.data });

        //    })

    }
    handleSubmit = (data) => {
        if (data.promotionCode === undefined) {
            data.promotionCode = "brak kodu rabatowego";
        }

        this.setState({
            promotionCode: data.promotionCode
        });

        console.log(this.state.promotionCode);
    };
    
    handleClick = () => {

        const parameters = {
            offerId: this.state.offerId,
            hotelName: this.state.hotelName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            departure: this.state.departure,
            destination: this.state.destination,
            adults: this.state.adults,
            children_under_3: this.state.children_under_3,
            children_under_10: this.state.children_under_10,
            children_under_18: this.state.children_under_18,
            number_of_2_room: this.state.number_of_2_room,
            number_of_apartaments: this.state.number_of_apartaments,
            transport: this.state.transport,
            breakfast: this.state.breakfast,
            wifi: this.state.wifi,
            price: this.state.price,
            promotionCode: this.state.promotionCode
        }
        const myUrlWithParams = new URLSearchParams(parameters);
        console.log(parameters);

        //POST  z rezerwacją

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                offerId: this.state.offerId,
                hotelName: this.state.hotelName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                departure: this.state.departure,
                destination: this.state.destination,
                adults: this.state.adults,
                children_under_3: this.state.children_under_3,
                children_under_10: this.state.children_under_10,
                children_under_18: this.state.children_under_18,
                number_of_2_room: this.state.number_of_2_room,
                number_of_apartaments: this.state.number_of_apartaments,
                transport: this.state.transport,
                breakfast: this.state.breakfast,
                wifi: this.state.wifi,
                promotionCode: this.state.promotionCode

            })
        };
           
        fetch(webAPI_URL + reserveROUTE, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status

                // !!!!!!!!!!uncoment this
                //const error = (data && data.message) || response.status;
                //return Promise.reject(error);
            }

            window.location.href = "/payment?" + myUrlWithParams;
        })
            .catch(error => {
                window.location.href = "/error";
            });
        
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
            <div className="border list-group-item mt-1 offer h5">
                <div className="border list-group-item mt-1 offer h5">
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
                    <h3>Cena: {this.state.price} PLN</h3>
                </div>
                <p>

                </p>
                <p>

                </p>
                <div className="border list-group-item mt-1 offer h5">
                    <h5>Podaj kod promocyjny (opcjonalnie)</h5>
                    <Form
                        onSubmit={this.handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"promotionCode"}
                                            component={Input}
                                            pattern={"[a-z]+"}
                                            minLength={4}
                                            maxLength={4}
                                        />
                                    </div>
                                </fieldset>
                                <p>

                                </p>
                                <div >
                                    <button
                                        type={"submit"}
                                        className="reserve">
                                        Wykorzystaj kod
                                    </button>
                                </div>
                            </FormElement>
                        )}
                    />
                </div>
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

