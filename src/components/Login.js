import React, { Component } from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";

const webAPI_URL = "http://localhost:8090";
const userROUTE = "/Login/Auth";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: ""
        };
    }

    handleSubmit = async (data) => {

        this.setState({
            user: data.login,
            password: data.password
        });

        // POST user
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: data.login,
                password: data.password
            })
        };

        const response = await fetch(webAPI_URL + userROUTE, requestOptions);

        if (!response.ok) {
            const parameters = {
                user: data.login,
                userExists: false
            };

            const myUrlWithParams = new URLSearchParams(parameters);
            window.location.href = "/loginInformation?" + myUrlWithParams;
        }
        else {
            const resp = await response.json();
            console.log(resp);
            const guidNumber = resp.userId;
            console.log(guidNumber);

            this.setState({
                guid: guidNumber,
                userExists: true
            });

            let obj = { user: data.login, guid: guidNumber }
            sessionStorage.setItem('user-key', JSON.stringify(obj));

            const parameters = {
                user: data.login,
                userExists: true
            };

            const myUrlWithParams = new URLSearchParams(parameters);
            window.location.href = "/loginInformation?" + myUrlWithParams;
        }
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
                                            component={Input}/>
                                    </div>
                                </fieldset>
                                <h5>Hasło</h5>
                                <fieldset>
                                    <div>
                                        <Field
                                            name={"password"}
                                            minLength={2}                                            
                                            type="password"
                                            component={Input}/>
                                    </div>
                                </fieldset>
                                <p>
                                </p>
                                <div >
                                    <button
                                        type={"submit"}
                                        className="log">
                                        Zaloguj się
                                    </button>
                                </div>
                            </FormElement>
                        )}/>
                </div>
            </div>
        );
    }
}
