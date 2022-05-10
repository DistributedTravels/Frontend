import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Destinations } from './components/Destinations';
import { Offer } from './components/Offer';
import { SingleOffer } from './components/SingleOffer';
import { Login } from "./components/Login";
import { Reservation } from "./components/Reservation";
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
            <Route path="/singleoffer" component={SingleOffer} />
            <Route path="/reservation" component={Reservation} />
      </Layout>
    );
  }
}
