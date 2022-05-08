import React, { Component} from "react";
import { Offer }   from './Offer';
import { Form, Field } from "@progress/kendo-react-form";
import { Checkbox } from "@progress/kendo-react-inputs";
import destination_dataset from "./destinations_dataset";
import departure_dataset from "./departure_dataset";
import checkbox from "./checkbox";

import DateRangePicker from 'react-bootstrap-daterangepicker';
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';


var currentDate = new Date(); //use your date here
currentDate = currentDate.toLocaleDateString('en-US'); // "en-US" gives date in US Format - mm/dd/yy



const DateInput = (fieldProps) => {
    const {
        label, onBlur, value, onChange, onFocus } = fieldProps;
    return (
        <div onBlur={onBlur} onFocus={onFocus}>
            <label>
                {label}
            </label>
            <DateRangePicker onApply={onChange} onCancel={(event, picker) => handleDateCancel(event, picker)} initialSettings={{ minDate: new Date(), startDate: new Date(), endDate: '9/30/2023' }}>
                <input readOnly
                    value={value}
                    type="text" />
            </DateRangePicker>
        </div>
    );
};

const NumberInputAdults = (fieldProps) => {
    const {
        fieldType, minValue, maxValue, label, value, visited, valid,
        onChange, onBlur, onFocus, validationMessage,
    } = fieldProps;
    const invalid = !valid && visited;
    return (
        <div onBlur={onBlur} onFocus={onFocus}>
            <label>
                {label}
            </label>
            <input
                type={fieldType}
                min={minValue}
                max={maxValue}
                className={invalid ? "invalid" : ""}
                value={value}
                onChange={onChange} />
            {invalid &&
                (<div className="required">{validationMessage}</div>)}
        </div>
    );
};

const NumberInputChildren = (fieldProps) => {
    const {
        fieldType, minValue, maxValue, label, value,
        onChange, onBlur, onFocus,
    } = fieldProps;
    return (
        <div onBlur={onBlur} onFocus={onFocus}>
            <label>
                {label}
            </label>
            <input
                type={fieldType}
                min={minValue}
                max={maxValue}
                value={value}
                onChange={onChange} />
        </div>
    );
};

const DropDown = ({ label, value, options,
    onChange, onBlur, onFocus }) => {
    return (
        <div onBlur={onBlur} onFocus={onFocus}>
            <label>
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}>
                {options.map(option => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}




const CheckBox = (fieldProps) => {
    const {
        fieldType, label, value,
        onChange, onBlur, onFocus,
    } = fieldProps;

    return (
        <div onBlur={onBlur} onFocus={onFocus}>
            <label>
                {label}
            </label>
            <input
                type={fieldType}
                value={value}
                
               
                 />
        </div>
    );
};

const handleDateCancel = (event, picker) => {
    picker.setStartDate(new Date())
    picker.setEndDate(new Date())
}

export class SearchingForm extends Component {

    state = {
        showOffers: false,
        searchingParam: {
            when: currentDate + "-" + currentDate,
            departure: "Warszawa",
            destination: "wszędzie",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            breakfast: "Nie",
            wifi: "Nie"
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
                children_under_18: data.children_under_18,
                breakfast: data.breakfast,
                wifi: data.wifi
                
            }
        });
    };

        render(){
          
        return (
            <div>
            <div className="border list-group-item mt-1 offer h5">
            <Form
                onSubmit={this.handleSubmit.bind(this)}
                initialValues={{
                    when: currentDate + "-" + currentDate,
                    departure: "Warszawa",
                    destination: "wszędzie",
                    adults: "1",
                    children_under_3: "0",
                    children_under_10: "0",
                    children_under_18: "0",
                    breakfast: "Nie",
                    wifi: "Nie"
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
                            label="Wifi"
                            name="wifi"
                            component={DropDown}
                            options={checkbox} />

                        <Field
                            label="Śniadanie"
                            name="breakfast"
                            component={DropDown}
                            options={checkbox} />

                        <p>

                        </p>

                        <input className="submitButton mt-4" type="submit" value="Szukaj" onClick = { () => { this.setState({ showOffers: true }); }} />

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