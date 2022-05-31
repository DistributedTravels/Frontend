import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';


const Chat = (param) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    const [destination, setDestination] = useState(null);
    const [hotelName, setHotel] = useState(null);

    latestChat.current = chat;

    useEffect(() => {
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

                    console.log(param.param.destination);
                    console.log(param.param.hotelName);

                    connection.on('EventMessage', message => {
                        console.log('Message: ', message);
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setDestination(message.destination)
                        setHotel(message.hotelName);

                        if (param.param.hotelName === message.hotelName && param.param.destination === message.destination) {
                            setChat(updatedChat);
                        }
                        
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);


    //const sendMessage = async (user, message) => {
    //    const chatMessage = {
    //        user: user,
    //        message: message
    //    };

    //    if (connection.connectionStarted) {
    //        try {
    //            await connection.send('SendMessage', chatMessage);
    //        }
    //        catch (e) {
    //            console.log(e);
    //        }
    //    }
    //    else {
    //        alert('No connection to server yet.');
    //    }
    //}

    return (
        <div>
          
            <hr />
                <ChatWindow chat={chat} /> 
        </div>
    );
};

export default Chat;