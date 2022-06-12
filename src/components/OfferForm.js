import React, { Component } from 'react';
import { Form, Field } from "@progress/kendo-react-form";
import { NumberInput } from './formComponents'
import { DropDown } from './formComponents'

const searchParams = new URLSearchParams(window.location.search);

export class OfferForm extends Component {
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
        hotelId: "",
        transportId: "",
        wifiList: [],
        breakfastList: [],
        transportList: []
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
            hotelId: searchParams.get("hotelId"),
            transportId: searchParams.get("transportId")
        });

        if (searchParams.get("wifiAvailable") === "true") {
            this.setState({
                wifiList: ["Nie", "Tak"]
            })
        }
        else {
            this.setState({
                wifiList: ["Nie"]
            })
        }
        if (searchParams.get("breakfastAvailable") === "true") {
            this.setState({
                breakfastList: ["Nie", "Tak"]
            })
        }
        else {
            this.setState({
                breakfastList: ["Nie"]
            })
        }
        if (searchParams.get("planeAvailable") === "true") {
            this.setState({
                transportList: ["Dojazd własny", "Samolot"]
            })
        }
        else {
            this.setState({
                transportList: ["Dojazd własny"]
            })
        }
    }
    
    handleSubmit = (data) => {
        if (data.number_of_2_room === undefined) {
            data.number_of_2_room = "0";
        }
        if (data.number_of_apartaments === undefined) {
            data.number_of_apartaments = "0";
        }
        if (data.transport === undefined) {
            data.transport = "Dojazd własny";
        }
        if (data.breakfast === undefined) {
            data.breakfast = "Nie";
        }
        if (data.wifi === undefined) {
            data.wifi = "Nie";
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
            number_of_2_room: data.number_of_2_room,
            number_of_apartaments: data.number_of_apartaments,
            transport: data.transport,
            breakfast: data.breakfast,
            wifi: data.wifi
        }
        console.log(parameters);
        const myUrlWithParams = new URLSearchParams(parameters);
        window.location.href = "/reservation?" + myUrlWithParams;
    };

    render() {
        return (
            <div>
                <h1>Oferta</h1>
                <div>
                    <div className="border list-group-item mt-1 offer h5">
                        <Form
                            onSubmit={this.handleSubmit.bind(this)}
                            initialValues={{
                                number_of_2_room: "0",
                                number_of_apartaments: "0",
                                transport: "Dojazd własny",
                                breakfast: "Nie",
                                wifi: "Nie"
                            }}
                            render={(formRenderProps) => (
                                <form onSubmit={formRenderProps.onSubmit}>
                                    <Field
                                        label="Liczba pokojów 2-osobowych"
                                        name="number_of_2_room"
                                        fieldType="number"
                                        minValue="0"
                                        maxValue="5"
                                        component={NumberInput} />
                                    <Field
                                        label="Liczba apartamentów"
                                        name="number_of_apartaments"
                                        fieldType="number"
                                        minValue="0"
                                        maxValue="5"
                                        component={NumberInput} />
                                    <Field
                                        label="Śniadanie"
                                        name="breakfast"
                                        component={DropDown}
                                        options={this.state.breakfastList} />
                                    <Field
                                        label="Wifi"
                                        name="wifi"
                                        component={DropDown}
                                        options={this.state.wifiList} />
                                    <Field
                                        label="Transport"
                                        name="transport"
                                        component={DropDown}
                                        options={this.state.transportList} />
                                    <p>
                                    </p>
                                    <input type="submit" value="Sprawdź ofertę" onClick={this.handleSubmit} />
                                </form>
                            )}>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}