import React, { Component } from 'react';
import { Form, Field } from "@progress/kendo-react-form";
import transport from "./transport";
import checkbox from "./checkbox";
const webAPI_URL = "http://localhost:8090";
const offersROUTE = "/Offers/GetOffers";

import axios from 'axios'
import { SingleOffer } from './SingleOffer';

var currentDate = new Date(); //use your date here
currentDate = currentDate.toLocaleDateString('en-US'); // "en-US" gives date in US Format - mm/dd/yy
var baseDate = "07/01/2022";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);



const NumberInput = (fieldProps) => {
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





export class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            when: baseDate + "-" + baseDate,
            departure: "Warszawa",
            destination: "gdziekolwiek",
            adults: "1",
            children_under_3: "0",
            children_under_10: "0",
            children_under_18: "0",
            previousOffers: [1,2],
            offers: [1, 4]
            
        };
    }
  

    componentWillReceiveProps(nextProps) {
        this.setState({ when: nextProps.param.when })
        this.setState({ departure: nextProps.param.departure })
        this.setState({ destination: nextProps.param.destination })
        this.setState({ adults: nextProps.param.adults })
        this.setState({ children_under_3: nextProps.param.children_under_3 })
        this.setState({ children_under_10: nextProps.param.children_under_10 })
        this.setState({ children_under_18: nextProps.param.children_under_18 })

        //const num = Number(this.state.adults);
        //const num2 = Number(this.state.children_under_18);
        //this.sum = num + num2;


    }

    componentDidMount() {
        const myUrlWithParams = new URL(webAPI_URL + offersROUTE);

        const date = this.state.when;
        const dates = date.split("-");
        const start = dates[0].replaceAll("/", "-");
        const end = dates[1].replaceAll("/", "-");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure",  this.state.departure );
        myUrlWithParams.searchParams.append("destination", this.state.destination);
        myUrlWithParams.searchParams.append("adults", this.state.adults);
        myUrlWithParams.searchParams.append("children_under_3", this.state.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", this.state.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", this.state.children_under_18);

        axios.get(myUrlWithParams.href)
            .then(res => {

                this.setState({ previousoffers: this.state.offers });
                this.setState({ offers: res.data });

            })

        //axios.get(`http://localhost:8090/offers/getoffers`)
        //    .then(res => {

        //        this.setstate({ previousoffers: this.state.offers });
        //        this.setstate({ offers: res.data });

        //    })
        

    }
    componentDidUpdate() {
        const myUrlWithParams = new URL(webAPI_URL + offersROUTE );
        const date = this.state.when;
        const dates = date.split("-");
        const start = dates[0].replaceAll("/", "-");
        const end = dates[1].replaceAll("/", "-");

        myUrlWithParams.searchParams.append("startDate", start);
        myUrlWithParams.searchParams.append("endDate", end);
        myUrlWithParams.searchParams.append("departure", this.state.departure);
        myUrlWithParams.searchParams.append("destination", this.state.destination);
        myUrlWithParams.searchParams.append("adults", this.state.adults);
        myUrlWithParams.searchParams.append("children_under_3", this.state.children_under_3);
        myUrlWithParams.searchParams.append("children_under_10", this.state.children_under_10);
        myUrlWithParams.searchParams.append("children_under_18", this.state.children_under_18);

        if (!equals(this.state.offers, this.state.previousOffers)) {
            axios.get(myUrlWithParams.href)
                .then(res => {

                    this.setState({ previousOffers: this.state.offers });
                    this.setState({ offers: res.data });

                })
        }
       
    }

  
    

    render() {


        return (

            <div className="border list-group-item mt-1 offer h5">

                <h3 className="text-center mt-5">Wyniki wyszukiwania</h3>
                

                <ul>
                    {
                        this.state.offers
                            .map(offer =>
                                <li key={offer.id} className="border list-group-item mt-5 offer">
                                    <h4>{offer.hotelName}</h4>
                                    <h5>{offer.destination}</h5>

                                    <SingleOffer param={this.state}></SingleOffer>

                                   
                                   
                                </li>
                            )
                    }
                </ul>

            </div>
        )
    }
}
