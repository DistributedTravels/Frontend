import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: ""
        };
    }

    render() {
        const { user, password } = this.state;
        return (
            <div>
            <div className="border list-group-item mt-1 offer h5">
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Nazwa użytkownika</label>
                <input
                    name="user"
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={user}
                    onChange={this.handleChange}
                />
                <label htmlFor="email">Hasło</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Wpisz hasło"
                    value={password}
                    onChange={this.handleChange}
                        />
                <p>

                </p>
                        <button className="log" type="submit">Zaloguj się</button>
                    </form>
            </div>
            </div>
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        console.log("Submitting");
        console.log(this.state);
    };
}
