import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindowForPrice from './ChatWindowForPrice';

import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const changesROUTE = "/Offers/GetLastChanges";

const ChatForPrice = (param) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    

    latestChat.current = chat;

    useEffect(() => {

        const updatedChat = [...latestChat.current];

        console.log(param.param);

        if (updatedChat.length > 0) {
            updatedChat.pop();
        }
        updatedChat.push(param.param);

        setChat(updatedChat);

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

                    connection.on('OfferChanged', message => {
                        console.log('Message: ', message);
                        const updatedChat = [...latestChat.current];

                        if (updatedChat.length > 0) {
                            updatedChat.pop();
                        }
                        updatedChat.push(message.newOffer);

                        if (param.param.hotelName === message.newOffer.hotelName && param.param.destination === message.newOffer.destination) {
                            setChat(updatedChat);
                        }


                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);



    return (
        <div>

            <hr />
            <ChatWindowForPrice chat={chat} />
        </div>
    );
};

export default ChatForPrice;