import React, { Component } from 'react';


export class Error extends Component
{


    constructor(props) {
        super(props);
    }

    render() {


        return (
            < div >
                < h1 > Błąd rezerwacji </ h1 >
                <h5 style={{ color: 'red' }}> Oferta już niedostępna </h5>
   

               </ div >
        );
    }
}

