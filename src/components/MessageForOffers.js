import React from 'react';

const MessageForOffers = (props) => (
    <div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>Hotel: {props.offer1.hotel}</p>
            <p>Pokój: {props.offer1.room}</p>
            <p>Transport: {props.offer1.transport}</p>
        </div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>Hotel: {props.offer2.hotel}</p>
            <p>Pokój: {props.offer2.room}</p>
            <p>Transport: {props.offer2.transport}</p>
        </div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>Hotel: {props.offer3.hotel}</p>
            <p>Pokój: {props.offer3.room}</p>
            <p>Transport: {props.offer3.transport}</p>
        </div>
    </div>

);

export default MessageForOffers;