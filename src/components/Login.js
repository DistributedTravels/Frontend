import React, { Component } from 'react';

import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
const webAPI_URL = "http://localhost:8090";
const userROUTE = "/Users/User";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            userExists: true
        };
    }

    handleSubmit = (data) => {

        this.setState({
            user: data.login,
            password: data.password
            
        });

        //POST user

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: data.login,
                password: data.password
            })
        };

        fetch(webAPI_URL + userROUTE, requestOptions);

        if (this.state.userExists) {
            sessionStorage.setItem('user-key', data.login);
        }

        const parameters = {
            user: data.login,

        }
        const myUrlWithParams = new URLSearchParams(parameters);

        window.location.href = "/loginInformation?" + myUrlWithParams;

    };

    render() {
        return (
            <div className="border list-group-item mt-1 offer h5">
                <h1>Zaloguj się</h1>
                <p>

                </p>

                <div className="border list-group-item mt-1 offer h5">

                    <Form
                        onSubmit={this.handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                <h5>Login</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"login"}
                                            minLength={2}
                                           
                                            component={Input}

                                        />
                                    </div>
                                </fieldset>
                                <h5>Hasło</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"password"}
                                            minLength={2}
                                            
                                            type="password"
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
                                        onClick={this.handleSubmit}>
                                        Zaloguj się
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
