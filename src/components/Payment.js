import React, { Component } from 'react';
const webAPI_URL = "http://localhost:8090";
const paymentROUTE = "/Offers/Pay";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";

const searchParams = new URLSearchParams(window.location.search);

export class Payment extends Component {


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
        price: "niedostępna",
        promotionPrice: "brak zniżki",
        promotionCode: "brak kodu rabatowego",
        cardNumber: "",
        paymentSucceeded: false
        
    }

    componentDidMount() {

        // GET promotionPrice

        this.setState({
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
            //promotionPrice: 
        });
    }

    handleSubmit = (data) => {

        this.setState({
            cardNumber: data.cardNumber
        });

        //POST  with payment

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                offerId: this.state.offerId,
                hotelName: this.state.hotelName,
                hotelId: this.state.hotelId,
                transportId: this.state.transportId,
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

            })
        };

        fetch(webAPI_URL + paymentROUTE, requestOptions);

        if (data.cardNumber === undefined) {
            data.cardNumber = "";
        }

        const parameters = {
            offerId: this.state.offerId,
            hotelName: this.state.hotelName,
            hotelId: this.state.hotelId,
            transportId: this.state.transportId,
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
        window.location.href = "/paymentInformation?" + myUrlWithParams;

        
    };

    render() {
        const validationMessage = "Wprowadź tylko liczby";

        return (
            <div className="border list-group-item mt-1 offer h5">
                <h1>Zapłać</h1>
                <h3>Cena regularna: {this.state.price}</h3>
                <h3>
                    Cena promocyjna: {this.state.promotionPrice}
                </h3>
                <p>

                </p>
                <h5>
                    Masz minutę na dokonanie płatności. Po tym czasie rezerwacja przepadnie
                </h5>
                <p>

                </p>

                <div className="border list-group-item mt-1 offer h5">
                    <h5>Podaj numer karty do płatności</h5>
                    <Form
                        onSubmit={this.handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                <fieldset>
                                    <div>
                                        <Input
                                            name={"cardNumber"}
                                            pattern={"[0-9]+"}
                                            minLength={12}
                                            maxLength={12}
                                            required={true}
                                        />
                                    </div>
                                </fieldset>
                                <p>

                                </p>
                                <div >
                                    <button
                                        type={"submit"}
                                        className="reserve"
                                        
                                        onClick={this.handleSubmit}>
                                        Zapłać
                                    </button>
                                </div>
                            </FormElement>
                        )}
                    />

                </div>
            </div>
        );
    }
}
