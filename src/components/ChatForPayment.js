import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindowForPayment from './ChatWindowForPayment';

import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const offersAvailableROUTE = "/Offers/CheckOfferAvailability";
const searchParams = new URLSearchParams(window.location.search);

const ChatForPayment = (param) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const updatedChat = [...latestChat.current];

        console.log(searchParams.get("price"));

        if (updatedChat.length > 0) {
            updatedChat.pop();
        }
        const mesObj = {
            price: searchParams.get("price"),
            offerAvailable: true,
            promotionCode: searchParams.get("promotionCode")
        };
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

                    connection.on('OfferChanged', message => {
                        console.log('Message: ', message);
                        const updatedChat = [...latestChat.current];

                        if (updatedChat.length > 0) {
                            updatedChat.pop();
                        }

                        var countPrice = 0;
                        if (searchParams.get("transport") === "Samolot") {
                            countPrice += message.newOffer.numberOfPeople * message.newOffer.transportPricePerSeat;
                        }
                        if (searchParams.get("breakfast") === "Tak") {
                            countPrice += message.newOffer.breakfastPrice;
                        }
                        const mesObj = {
                            price: (message.newOffer.hotelPrice + countPrice) * 1.5,
                            offerAvailable: message.newOffer.offerAvailable,
                            promotionCode: searchParams.get("promotionCode")
                        };
                        updatedChat.push(mesObj);

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
            <ChatWindowForPayment chat={chat} />
        </div>
    );
};

export default ChatForPayment;