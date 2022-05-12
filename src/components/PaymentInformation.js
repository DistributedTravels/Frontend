import React, { Component } from 'react';

export class PaymentInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentSucceeded: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ paymentSucceeded: nextProps.param.paymentSucceeded })

        console.log(nextProps.param.cardNumber);
    }

    render() {
        let information;
        if (this.state.paymentSucceeded) {
            information = <h5 style={{ color: 'green' }}> Płatność przezła pomyślnie. Oferta zarezerwowana. </h5>
        } else {
            information = <h5 style={{ color: 'red' }}> Płatność nie przeszła pomyślnie. Oferta niezarezerwowana. </h5>
        }

        return (

            <div className="border list-group-item mt-1 offer h5">
                {information}
            </div>
        )
    }
}
