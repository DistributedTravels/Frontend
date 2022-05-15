import React, { Component } from 'react';

import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
const webAPI_URL = "http://localhost:8090";
const userROUTE = "/Users/User";

export class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // remove
        sessionStorage.removeItem('user-key');

        // remove all
        sessionStorage.clear();
    }
    render() {
        return (
            <div className="border list-group-item mt-1 offer h5">
                <h1>Wylogowano</h1>
            </div>
        );
    }
}
