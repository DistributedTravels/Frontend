import React, { Component } from 'react';
import { Form, Field } from "@progress/kendo-react-form";
import destination_dataset from "./destinations_dataset";
import { DropDown } from './formComponents'

export class Destinations extends Component { 
    constructor(props) {
        super(props);
    }
    handleSubmit = (data) => {

        const parameters = {
            destination: data.destination
        }

        const myUrlWithParams = new URLSearchParams(parameters);
        window.location.href = "/checkOfferForDestination?" + myUrlWithParams;
    };

    render() {
        return (
            <div className="border list-group-item mt-1 offer h5">
                <Form
                    onSubmit={this.handleSubmit.bind(this)}
                    initialValues={{
                        destination: "gdziekolwiek"    
                    }}
                    render={(formRenderProps) => (
                        <form onSubmit={formRenderProps.onSubmit}>
                            <Field
                                label="Miejsce docelowe"
                                name="destination"
                                component={DropDown}
                                options={destination_dataset} />
                            <p>
                            </p>
                            <input type="submit" value="Sprawdź ofertę" onClick={this.handleSubmit} />
                        </form>
                    )}>
                </Form>
            </div>
        );
    }
}