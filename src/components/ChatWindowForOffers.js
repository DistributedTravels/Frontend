import React from 'react';

import MessageForOffers from './MessageForOffers';

const ChatWindowForOffers = (props) => {
    const chat = props.chat
        .map(m => <MessageForOffers
            key={Date.now() * Math.random()}
            offer1={m.topDestinations[0]}
            offer2={m.topDestinations[1]}
            offer3={m.topDestinations[2]}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForOffers;