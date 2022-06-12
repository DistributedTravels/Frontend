import React from 'react';
import MessageForReservation from './MessageForReservation';

const ChatWindowForReservation = (props) => {
    const chat = props.chat
        .map(m => <MessageForReservation
            key={Date.now() * Math.random()}
            message={m}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForReservation;