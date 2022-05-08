import React, { Component, useState } from 'react';
import SearchForm from './SearchForm';

export class Form extends Component
{
   
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.state = {date: ''}
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.setState({ date: event.target.value });
      
    }

    handleSubmit(event) {
        alert('Podano następujące imię: ' + this.state.value);
        alert('Podano następującą datę: ' + this.state.date);
       
        event.preventDefault();
    }
 
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Imię:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <SearchForm value={ this.state.date} onChange={this.handleChange}></SearchForm>
            
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}