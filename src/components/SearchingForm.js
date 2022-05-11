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


var currentDate = new Date(); //use your date here
currentDate = currentDate.toLocaleDateString('en-US'); // "en-US" gives date in US Format - mm/dd/yy

var baseDate = "07/01/2022";

export class SearchingForm extends Component {

    state = {
        showOffers: false,
        searchingParam: {
            when: baseDate+"-"+baseDate,
            departure: "Warszawa",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0"
        }
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
                children_under_18: data.children_under_18
            }
        });
    };

    render() {

        return (
            <div>
                <div className="border list-group-item mt-1 offer h5">
                    <Form
                        onSubmit={this.handleSubmit.bind(this)}
                        initialValues={{
                            when: "07/01/2022-07/01/2022",
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

                                <input type="submit" value="Szukaj" onClick={() => { this.setState({ showOffers: true }); }} />
                               

                            </form>
                        )}>
                    </Form>
                </div>
                <div>
                    
                    {this.state.showOffers ? <Offer param={this.state.searchingParam} /> : null}
                    {this.state.showOffers ? () => this.setState({ showOffers: false }) : null}

                </div>
            </div>


        );
    }
}