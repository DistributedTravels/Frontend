import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Destinations } from './components/Destinations';
import { Offer } from './components/Offer';
import { OfferForm } from './components/OfferForm';
import { CheckOfferForDestination } from './components/checkOfferForDestination';
import { Login } from "./components/Login";
import { Reservation } from "./components/Reservation";
import { Payment } from "./components/Payment";
import { ReservationError } from "./components/ReservationError";
import { PaymentInformation } from "./components/PaymentInformation";
import { LoginInformation } from "./components/LoginInformation";
import { MyAccount } from "./components/MyAccount";
import Chat from "./components/Chat";
import ChatWindow from "./components/ChatWindow";
import Message from "./components/Message";
import { Changes } from "./components/Changes";
import ChatForDestinations from "./components/ChatForDestinations";
import ChatWindowForDestinations from "./components/ChatWindowForDestinations";
import MessageForDestinations from "./components/MessageForDestinations";
import ChatForOffers from "./components/ChatForOffers";
import ChatWindowForOffers from "./components/ChatWindowForOffers";
import MessageForOffers from "./components/MessageForOffers";
import ChatForChanges from "./components/ChatForChanges";
import ChatWindowForChanges from "./components/ChatWindowForChanges";
import MessageForChanges from "./components/MessageForChanges";
import ChatForPrice from "./components/ChatForPrice";
import ChatWindowForPrice from "./components/ChatWindowForPrice";
import MessageForPrice from "./components/MessageForPrice";
import ChatForReservation from "./components/ChatForReservation";
import ChatWindowForReservation from "./components/ChatWindowForReservation";
import MessageForReservation from "./components/MessageForReservation";
import ChatForAccount from "./components/ChatForAccount";
import ChatWindowForAccount from "./components/ChatWindowForAccount";
import MessageForAccount from "./components/MessageForAccount";
import './custom.css'


export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
        <Layout>

        <Route exact path='/' component={Home} />
        <Route path='/destinations' component={Destinations} />
            <Route path="/login" component={Login} />
            <Route path="/offer" component={Offer} />
            <Route path="/offerForm" component={OfferForm} />
            <Route path="/checkOfferForDestination" component={CheckOfferForDestination} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/payment" component={Payment} />
            <Route path="/reservationError" component={ReservationError} />
            <Route path="/paymentInformation" component={PaymentInformation} />
            <Route path="/loginInformation" component={LoginInformation} />
            <Route path="/myAccount" component={MyAccount} />
            <Route path="/chat" component={Chat} />
            <Route path="/chatWindow" component={ChatWindow} />
            <Route path="/message" component={Message} />
            <Route path="/changes" component={Changes} />
            <Route path="/chatForDestinations" component={ChatForDestinations} />
            <Route path="/chatWindowForDestinations" component={ChatWindowForDestinations} />
            <Route path="/messageForDestinations" component={MessageForDestinations} />
            <Route path="/chatForOffers" component={ChatForOffers} />
            <Route path="/chatWindowForOffers" component={ChatWindowForOffers} />
            <Route path="/messageForOffers" component={MessageForOffers} />
            <Route path="/chatForChanges" component={ChatForChanges} />
            <Route path="/chatWindowForChanges" component={ChatWindowForChanges} />
            <Route path="/messageForChanges" component={MessageForChanges} />
            <Route path="/chatForPrice" component={ChatForPrice} />
            <Route path="/chatWindowForPrice" component={ChatWindowForPrice} />
            <Route path="/messageForPrice" component={MessageForPrice} />
            <Route path="/chatForReservation" component={ChatForReservation} />
            <Route path="/chatWindowForReservation" component={ChatWindowForReservation} />
            <Route path="/messageForReservation" component={MessageForReservation} />
            <Route path="/chatForAccount" component={ChatForAccount} />
            <Route path="/chatWindowForAccount" component={ChatWindowForAccount} />
            <Route path="/messageForAccount" component={MessageForAccount} />
      </Layout>
    );
  }
}
