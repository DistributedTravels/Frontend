import React, { Component } from 'react';
import destination_dataset from "./destinations_dataset";

export class Destinations extends Component {
   

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Kierunki podróży</h1>
                <div className="border list-group-item mt-1 offer h5">
                <ul className="list-group">
                    {
                    destination_dataset.map(
                        destination =>
                            <li  value={destination} className="border list-group-item mt-1 offer h5">
                                {destination}
                                <button className="check_offer">Sprawdź ofertę</button>
                                   
                            </li>
                    )
                    }

                    </ul>
                    </div>
            </div>
        );
    }
}

