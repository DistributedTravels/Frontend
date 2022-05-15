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
        userExists: true
    }

    componentDidMount() {

        this.setState({
            user: searchParams.get("user")
        });

        //GET if user exists

        const myUrlWithParams = new URL(webAPI_URL + userROUTE);

        myUrlWithParams.searchParams.append("user", searchParams.get("user"));


        //axios.get(myUrlWithParams.href)
        //    .then(res => {
        //        this.setState({ userExists: res.data });
        // 
        //    })

        // if user exists
        
  
    }

    render() {


        return (
            < div className="border list-group-item mt-1 offer h5">
                {this.state.userExists ?
                    <h5 style={{ color: 'green' }}> Zalogowano jako:  {this.state.user}</h5> :
                    <h5 style={{ color: 'red' }}> Podano niepoprawny login lub hasło, albo użytkownik nie istnieje </h5>
                }

            </ div >
        );
    }
}

