import React, { Component } from 'react';
import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const userROUTE = "/Users/CheckUser";

const searchParams = new URLSearchParams(window.location.search);

export class LoginInformation extends Component {


    constructor(props) {
        super(props);
    }

    state = {
        user: "",
        userExists: ""
    }

    componentDidMount() {

        this.setState({
            user: searchParams.get("user"),
            userExists: searchParams.get("userExists")
        });        
  
    }

    render() {


        return (
            < div className="border list-group-item mt-1 offer h5">
                {this.state.userExists === "true" ?
                    <h5 style={{ color: 'green' }}> Zalogowano jako:  {this.state.user}</h5> :
                    <h5 style={{ color: 'red' }}> Podano niepoprawny login lub hasło, albo użytkownik nie istnieje </h5>
                }

            </ div >
        );
    }
}

