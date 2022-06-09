import React from 'react';

const MessageForPrice = (props) => (

    <div >
        <h5>Liczba wolnych pokojów 2-osobowych: {props.message.smallRoomsAvailable}</h5>
        <h5>Liczba wolnych apartamentów: {props.message.bigRoomsAvailable}</h5>
        {props.message.offerAvailable ? <h3> Cena PLN od: {props.message.hotelPrice}</h3> : null}
        {props.message.offerAvailable ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
    </div>
);

export default MessageForPrice;