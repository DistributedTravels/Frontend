import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindowForChanges from './ChatWindowForChanges';

import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const changesROUTE = "/Offers/GetLastChanges";

const ChatForChanges = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {

        const myUrlWithParams = new URL(webAPI_URL + changesROUTE);
        axios.get(myUrlWithParams.href)
            .then(res => {
                const updatedChat = [...latestChat.current];

                if (updatedChat.length > 0) {
                    updatedChat.pop();
                }
                updatedChat.push(res.data);

                console.log(res.data);

                setChat(updatedChat);

            })


        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:8090/hubs/events')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('TopDestinationsMessage', message => {
                        console.log('Message: ', message);
                        const updatedChat = [...latestChat.current];

                        if (updatedChat.length > 0) {
                            updatedChat.pop();
                        }
                        updatedChat.push(message);

                        setChat(updatedChat);


                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);



    return (
        <div>

            <hr />
            <ChatWindowForChanges chat={chat} />
        </div>
    );
};

export default ChatForChanges;