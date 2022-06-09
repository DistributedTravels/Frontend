import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindowForAccount from './ChatWindowForAccount';

import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const searchParams = new URLSearchParams(window.location.search);

const ChatForAccount = (param) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const updatedChat = [...latestChat.current];

        const mesObj = {
            price: param.param.totalPrice,
            status: param.param.status === "BOOKED" ? true: false
        };

        if (updatedChat.length > 0) {
            updatedChat.pop();
        }
        
        updatedChat.push(mesObj);

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

                    connection.on('ReservationChange', message => {
                        console.log('Message: ', message);
                        const updatedChat = [...latestChat.current];

                        if (updatedChat.length > 0) {
                            updatedChat.pop();
                        }

                        var countPrice = 0;
                        if (message.newReservation.transportId !== -1) {
                            if (!param.param.hasOwnTransport) {
                                countPrice += param.param.numberOfPeople * message.changeInTransportPrice;
                            }
                        }
                        var hotelPrice = message.newReservation.hotelId !== -1 ? message.newReservation.changeHotelPrice : param.param.hotelPrice;
                        var discount = param.param.hasDiscount ? 0.9 : 1.0;
                        const mesObj = {
                            price: ( hotelPrice + countPrice ) * 1.5 * discount,
                            status: message.newReservation.reservationAvailable
                        };
                        updatedChat.push(mesObj);

                        if (param.param.reservationId === message.newReservation.reservationId ) {
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
            <ChatWindowForAccount chat={chat} />
        </div>
    );
};

export default ChatForAccount;