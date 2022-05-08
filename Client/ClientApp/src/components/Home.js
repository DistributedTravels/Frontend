import React, { Component } from 'react';
//import SearchForm from './SearchForm';
//import { Form } from './Form';
import { SearchingForm } from './SearchingForm';

//const Aux = props => props.children;

export class Home extends Component {

    render() {
        return (
            <div>
                <h1> Wyszukaj wakacje marzeń </h1>
                <div className="border list-group-item mt-1 offer h5">
                    <SearchingForm></SearchingForm>
                </div>
               
            </div>

        );
    };
}
