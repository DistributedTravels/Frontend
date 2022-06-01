import React, { Component } from 'react';

import { Form, Field, FormElement } from "@progress/kendo-react-form";

import { Input } from "@progress/kendo-react-inputs";
const webAPI_URL = "http://localhost:8090";
const paymentROUTE = "/Payment/SendInformation";

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
        fullName: "",
        CVV: "",
        expDate: "",
        paymentSucceeded: false,
        postId: "",
        attempt: "1"
        
    }

    componentDidMount() {

        // GET promotionPrice

        var p;
        var pp;

        if (searchParams.get("promotionCode") === "abcd") {
            p = Number(searchParams.get("price"));
            pp = 0.9 * p;

            this.setState({
                promotionPrice: pp
            });

        }

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
            promotionCode: searchParams.get("promotionCode"),
            postId: searchParams.get("postId"),
            attempt: searchParams.get("attempt")
        });
    }

    handleSubmit = async (data) => {

        if (data.cardNumber === undefined) {
            data.cardNumber = "";
        }
        if (data.CVV === undefined) {
            data.CVV = "";
        }
        if (data.expDate === undefined) {
            data.expDate = "";
        }
        if (data.fullName === undefined) {
            data.fullName = "";
        }

        this.setState({
            cardNumber: data.cardNumber,
            fullName: data.fullName,
            CVV: data.CVV,
            expDate: data.expDate
        });

        //POST  with payment

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: data.cardNumber,
                fullName: data.fullName,
                cVV: data.CVV,
                expDate: data.expDate,
                reservationId: this.state.postId

            })
        };

        const response = await fetch(webAPI_URL + paymentROUTE, requestOptions)
        const resp = await response.json();
      
        const parameters = {
            postId: this.state.postId,
            price: this.state.price,
            promotionCode: this.state.promotionCode,
            attempt: this.state.attempt
            
        }

        const myUrlWithParams = new URLSearchParams(parameters);
        console.log(parameters);

        window.location.href = "/paymentInformation?" + myUrlWithParams;
        
    };

    render() {
       
        let but;
        but = <button type={"submit"} className="reserve"> Zapłać </button>
        
        

        return (
            <div className="border list-group-item mt-1 offer h5">
                {this.state.attempt === "1" ? <h1>Zapłać</h1> :
                    <h1>Płatność nie powiodła się. Ponów próbę płatności</h1>   }
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
                    
                    <Form
                        onSubmit={this.handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                <h5>Numer karty</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"cardNumber"}
                                            minLength={12}
                                            maxLength={12}
                                            pattern={"[0-9]+"}
                                            component={Input}

                                        />
                                    </div>
                                </fieldset>
                                <h5>CVV</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"CVV"}
                                            minLength={3}
                                            maxLength={3}
                                            pattern={"[0-9]+"}
                                            component={Input}

                                        />
                                    </div>
                                </fieldset>
                                <h5>Imię i nazwisko</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"fullName"}
                                            minLength={4}
                                            maxLength={35}
                                            pattern={"[a-zA-Z ]+"}
                                            component={Input}

                                        />
                                    </div>
                                </fieldset>
                                <h5>Data ważności karty mm/YY</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"expDate"}
                                            minLength={5}
                                            maxLength={5}
                                            pattern={"[0-9/]+"}
                                            component={Input}

                                        />
                                    </div>
                                </fieldset>
                                <p>

                                </p>
                                <div >
                                    <button
                                        type={"submit"}
                                        className="log"
                                    >
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
