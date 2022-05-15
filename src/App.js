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
import { Logout } from "./components/Logout";
import { Reservation } from "./components/Reservation";
import { Payment } from "./components/Payment";
import { ReservationError } from "./components/ReservationError";
import { PaymentInformation } from "./components/PaymentInformation";
import { LoginInformation } from "./components/LoginInformation";
import './custom.css'


export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
        <Layout>

        <Route exact path='/' component={Home} />
        <Route path='/destinations' component={Destinations} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/offer" component={Offer} />
            <Route path="/offerForm" component={OfferForm} />
            <Route path="/checkOfferForDestination" component={CheckOfferForDestination} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/payment" component={Payment} />
            <Route path="/reservationError" component={ReservationError} />
            <Route path="/paymentInformation" component={PaymentInformation} />
            <Route path="/loginInformation" component={LoginInformation} />
      </Layout>
    );
  }
}
