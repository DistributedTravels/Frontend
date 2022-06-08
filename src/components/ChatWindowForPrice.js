import React from 'react';

import MessageForPrice from './MessageForPrice';

const ChatWindowForPrice = (props) => {
    const chat = props.chat
        .map(m => <MessageForPrice
            key={Date.now() * Math.random()}
            message={m}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForPrice;