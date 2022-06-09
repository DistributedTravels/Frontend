import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindowForReservation from './ChatWindowForReservation';

import axios from 'axios';
const webAPI_URL = "http://localhost:8090";
const offersAvailableROUTE = "/Offers/CheckOfferAvailability";
const searchParams = new URLSearchParams(window.location.search);

const ChatForReservation = (param) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {

        const myUrlWithParams = new URL(webAPI_URL + offersAvailableROUTE);
        myUrlWithParams.searchParams.append("hotelName", searchParams.get("hotelName"));
        myUrlWithParams.searchParams.append("hotelId", searchParams.get("hotelId"));
        myUrlWithParams.searchParams.append("transportId", searchParams.get("transportId"));
        myUrlWithParams.searchParams.append("startDate", searchParams.get("startDate"));
        myUrlWithParams.searchParams.append("endDate", searchParams.get("endDate"));
        myUrlWithParams.searchParams.append("adults", searchParams.get("adults"));
        myUrlWithParams.searchParams.append("children_under_3", searchParams.get("children_under_3"));
        myUrlWithParams.searchParams.append("children_under_10", searchParams.get("children_under_10"));
        myUrlWithParams.searchParams.append("children_under_18", searchParams.get("children_under_18"));
        myUrlWithParams.searchParams.append("number_of_2_room", searchParams.get("number_of_2_room"));
        myUrlWithParams.searchParams.append("number_of_apartaments", searchParams.get("number_of_apartaments"));
        myUrlWithParams.searchParams.append("transport", searchParams.get("transport"));
        myUrlWithParams.searchParams.append("breakfast", searchParams.get("breakfast"));
        myUrlWithParams.searchParams.append("wifi", searchParams.get("wifi"));
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
                            answer: message.newOffer.offerAvailable
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
            <ChatWindowForReservation  chat={chat} />
        </div>
    );
};

export default ChatForReservation;