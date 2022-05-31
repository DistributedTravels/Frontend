import React from 'react';

const Message = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
        <p><strong>{props.user} kupił: </strong></p>
        <p>{props.destination}</p>
        <p>{props.hotelName}</p>
    </div>
);

export default Message;