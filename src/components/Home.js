import React, { Component } from 'react';
import { SearchingForm } from './SearchingForm';

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
