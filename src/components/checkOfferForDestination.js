import React, { Component } from "react";
import { Offer } from './Offer';
import { Form, Field } from "@progress/kendo-react-form";
import { DateInput } from './formComponents'
import { NumberInputAdults } from './formComponents'
import { NumberInputChildren } from './formComponents'
import { DropDown } from './formComponents'

import destination_dataset from "./destinations_dataset";
import departure_dataset from "./departure_dataset";

// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

import axios from 'axios';
import ChatForDestinations from './ChatForDestinations';
import ChatForOffers from './ChatForOffers';

const webAPI_URL = "http://localhost:8090";
const offersROUTE = "/Offers/GetOffers";

var baseDate = "07/02/2022";
var baseDate2 = "07/09/2022";

const searchParams = new URLSearchParams(window.location.search);

export class CheckOfferForDestination extends Component {
    state = {
        showOffers: true,
        searchingParam: {
            when: baseDate + "-" + baseDate2,
            departure: "gdziekolwiek",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            offers: [],
            beforeSearch: true
        }
    }

    componentDidMount() {
        this.setState({ searchingParam: { ...this.state.searchingParam, destination: searchParams.get("destination") } });

        console.log(this.state.searchingParam.destination);
        console.log(searchParams.get("destination"));

        const myUrlWithParams = new URL(webAPI_URL + offersROUTE);

        const date = this.state.searchingParam.when;
        const dates = date.split("-");

        var start = dates[0].replaceAll("/", "-");
        start = start.replaceAll(" ", "");
        var end = dates[1].replaceAll("/", "-");
        end = end.replaceAll(" ", "");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure", this.state.searchingParam.departure);
        myUrlWithParams.searchParams.append("destination", searchParams.get("destination"));
        myUrlWithParams.searchParams.append("adults", this.state.searchingParam.adults);
        myUrlWithParams.searchParams.append("children_under_3", this.state.searchingParam.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", this.state.searchingParam.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", this.state.searchingParam.children_under_18);

        axios.get(myUrlWithParams.href)
            .then(res => {
                this.setState({
                    searchingParam: {
                        ...this.state.searchingParam,
                        offers: res.data,
                        beforeSearch: false
                    }
                });
            })
    }

    handleSubmit = (data) => {
        this.setState({
            searchingParam: {
                ...this.state.searchingParam,
                when: data.when,
                departure: data.departure,
                destination: data.destination,
                adults: data.adults,
                children_under_3: data.children_under_3,
                children_under_10: data.children_under_10,
                children_under_18: data.children_under_18,
                beforeSearch: true
            }
        });

        const myUrlWithParams = new URL(webAPI_URL + offersROUTE);
        const date = data.when;
        const dates = date.split("-");
        var start = dates[0].replaceAll("/", "-");
        start = start.replaceAll(" ", "");
        var end = dates[1].replaceAll("/", "-");
        end = end.replaceAll(" ", "");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure", data.departure);
        myUrlWithParams.searchParams.append("destination", data.destination);
        myUrlWithParams.searchParams.append("adults", data.adults);
        myUrlWithParams.searchParams.append("children_under_3", data.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", data.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", data.children_under_18);

        axios.get(myUrlWithParams.href)
            .then(res => {
                this.setState({
                    searchingParam: {
                        ...this.state.searchingParam,
                        offers: res.data,
                        beforeSearch: false
                    }
                });
            })
    };

    render() {
        console.log(this.state.searchingParam.destination);
        console.log(searchParams.get("destination"));

        return (
            <div class="row">
                <div class="column1">
                    <div className="border list-group-item mt-1 offer h5">
                        <Form
                            onSubmit={this.handleSubmit.bind(this)}
                            initialValues={{
                                when: baseDate + " - " + baseDate2,
                                departure: "Warszawa",
                                destination: "gdziekolwiek",
                                adults: "1",
                                children_under_3: "0",
                                children_under_10: "0",
                                children_under_18: "0"
                            }}
                            render={(formRenderProps) => (
                                <form onSubmit={formRenderProps.onSubmit}>
                                    <Field
                                        label="Miejsce docelowe"
                                        name="destination"
                                        component={DropDown}
                                        options={destination_dataset} />
                                    <Field
                                        label="Miejsce wyjazdu"
                                        name="departure"
                                        component={DropDown}
                                        options={departure_dataset} />
                                    <Field
                                        label="Termin"
                                        name="when"
                                        component={DateInput} />
                                    <Field
                                        label="Liczba osób dorosłych"
                                        name="adults"
                                        fieldType="number"
                                        minValue="1"
                                        maxValue="5"
                                        component={NumberInputAdults} />
                                    <Field
                                        label="Liczba dzieci w wieku do 3 lat"
                                        name="children_under_3"
                                        fieldType="number"
                                        minValue="0"
                                        maxValue="3"
                                        component={NumberInputChildren} />
                                    <Field
                                        label="Liczba dzieci w wieku do 10 lat"
                                        name="children_under_10"
                                        fieldType="number"
                                        minValue="0"
                                        maxValue="3"
                                        component={NumberInputChildren} />
                                    <Field
                                        label="Liczba dzieci w wieku do 18 lat"
                                        name="children_under_18"
                                        fieldType="number"
                                        minValue="0"
                                        maxValue="3"
                                        component={NumberInputChildren} />
                                    <p>
                                    </p>
                                    <input type="submit" value="Szukaj" />
                                </form>
                            )}>
                        </Form>
                    </div>
                    <div>
                        {<Offer param={this.state.searchingParam} />}

                    </div>
                </div>
                <div class="column2" >
                    <div className="border list-group-item mt-1 offer h5">
                        <div class="row">
                            <h3>TOP 3 kierunki </h3>
                            <ChatForDestinations />
                        </div>
                        <div class="row">
                            <h3>TOP 3 oferty </h3>
                            <ChatForOffers />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
