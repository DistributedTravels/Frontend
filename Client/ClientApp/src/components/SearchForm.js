import React, { Component, useState } from 'react';
import destination_dataset from "./destinations_dataset";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function SearchForm() {
    const[startDate, setStartDate] = useState(new Date());
        
    return (
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
    );
    
}
export default SearchForm;
