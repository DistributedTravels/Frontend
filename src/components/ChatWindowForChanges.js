import React from 'react';

import MessageForChanges from './MessageForChanges';

const ChatWindowForChanges = (props) => {
    const chat = props.chat
        .map(m => <MessageForChanges
            key={Date.now() * Math.random()}
            message={m}
        />);

    return (
        <div>
            {chat}
        </div>
    )
};

export default ChatWindowForChanges;