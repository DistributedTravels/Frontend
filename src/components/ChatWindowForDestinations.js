import React from 'react';
import MessageForDestinations from './MessageForDestinations';

const ChatWindowForDestinations = (props) => {
    const chat = props.chat
        .map(m => <MessageForDestinations
            key={Date.now() * Math.random()}
            destination1={m.topDestinations[0]}
            destination2={m.topDestinations[1]}
            destination3={m.topDestinations[2]}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForDestinations;