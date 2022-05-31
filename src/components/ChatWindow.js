import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message
            key={Date.now() * Math.random()}
            hotelName={m.hotelName}
            destination={m.destination}
            user={m.user} />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindow;