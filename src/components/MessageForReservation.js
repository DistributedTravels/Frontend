import React from 'react';

const MessageForReservation = (props) => (
    <div>
        {props.message.answer ? <h3> Cena PLN: {props.message.price}</h3> : null}
        {props.message.answer ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
    </div>
);

export default MessageForReservation;