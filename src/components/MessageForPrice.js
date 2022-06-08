import React from 'react';

const MessageForPrice = (props) => (

    <div >
        {props.message.offerAvailable ? <h3> Cena od: {props.message.hotelPrice} PLN</h3> : <h3> Cena niedostępna</h3>}
        {props.message.offerAvailable ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
    </div>
);

export default MessageForPrice;