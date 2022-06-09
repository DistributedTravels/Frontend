import React from 'react';

const MessageForAccount = (props) => (

    <div >
        {props.message.status === true ? <h3> Cena PLN: {props.message.price}</h3> : null}
        {props.message.status === true ? <h5 style={{ color: 'green' }}> Dostępna</h5> : <h5 style={{ color: 'red' }}> Niedostępna</h5>}
    </div>
);

export default MessageForAccount;