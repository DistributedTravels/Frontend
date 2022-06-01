import React from 'react';

const MessageForDestinations = (props) => (
    <div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>{props.destination1}</p>
        </div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>{props.destination2}</p>
        </div>
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p>{props.destination3}</p>
        </div>
    </div>

);

export default MessageForDestinations;