import React from 'react';

const MessageForPayment = (props) => (
    <div>
        {props.message.offerAvailable ? <h3> Cena PLN: {props.message.price}</h3> : null}
        {props.message.offerAvailable && props.message.promotionCode === "abcd" ? <h3> Cena promocyjna PLN: {props.message.price * 0.9} </h3> : null}
        {props.message.offerAvailable ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
    </div>
);

export default MessageForPayment;