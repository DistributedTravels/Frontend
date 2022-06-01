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
      </Layout>
    );
  }
}
