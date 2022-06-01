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



export class SearchingForm extends Component {

    state = {
        showOffers: false,
        searchingParam: {
            when: baseDate + "-" + baseDate,
            departure: "Warszawa",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            offers: [],
            beforeSearch: true
        }
    }


    handleSubmit = (data) => {

        //if (data.when === undefined) {
        //    data.when = baseDate + "-" + baseDate;
        //}
        //if (data.departure === undefined) {
        //    data.departure = "Warszawa";
        //}
        //if (data.destination === undefined) {
        //    data.destination = "gdziekolwiek";
        //}
        //if (data.adults === undefined) {
        //    data.adults = "1";
        //}
        //if (data.children_under_3 === undefined) {
        //    data.children_under_3 = "0";
        //}
        //if (data.children_under_10 === undefined) {
        //    data.children_under_10 = "0";
        //}
        //if (data.children_under_18 === undefined) {
        //    data.children_under_18 = "0";
        //}

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

        return (
            <div class="row">
                <div class="col1">
                    <div className="border list-group-item mt-1 offer h5">
                        <Form
                            onSubmit={this.handleSubmit.bind(this)}
                            initialValues={{
                                when: baseDate + " - " + baseDate2,
                                departure: "Warszawa",
                                destination: "gdziekolwiek",
                                adults: "0",
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
                <div class="col2" >
                    <div className="border list-group-item mt-1 offer h5">
                        
                        <h3>TOP 3 kierunki </h3>
                        <ChatForDestinations/>
                    </div>
                </div>            
                      
                <div class="col3">
                    <div className="border list-group-item mt-1 offer h5">

                        <h3>TOP 3 oferty </h3>
                        <ChatForOffers />
                    </div>
                            
                </div>
                  
            </div>


        );
    }
}