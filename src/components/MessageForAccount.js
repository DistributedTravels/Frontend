import React from 'react';

const MessageForAccount = (props) => (

    <div >
        {props.message.status === true ? <h3> Cena PLN: {props.message.price}</h3> : null}
        {props.message.status === true ? <h5 style={{ color: 'green' }}> Rezerwacja dostępna</h5> : <h5 style={{ color: 'red' }}> Rezerwacja niedostępna</h5>}
    </div>
);

export default MessageForAccount;