import React from 'react';

import MessageForPayment from './MessageForPayment';

const ChatWindowForPayment = (props) => {
    const chat = props.chat
        .map(m => <MessageForPayment
            key={Date.now() * Math.random()}
            message={m}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForPayment;