import React, { Component } from 'react';
import ChatForChanges from './ChatForChanges';

export class Changes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="border list-group-item mt-1 offer h5">
                <h1>10 ostatnich zmian ofert</h1>
                <div class="row">
                    <div class="column3">
                        <h3 align="center"> Przed </h3>
                    </div>
                    <div class="column3">
                        <h3 align="center"> Po </h3>
                    </div>
                </div>
                <ChatForChanges/>
            </div>
        )
    }
}