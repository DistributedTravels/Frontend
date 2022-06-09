import React from 'react';

import MessageForAccount from './MessageForAccount';

const ChatWindowForAccount = (props) => {
    const chat = props.chat
        .map(m => <MessageForAccount
            key={Date.now() * Math.random()}
            message={m}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForAccount;