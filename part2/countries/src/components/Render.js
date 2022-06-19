import React, { useState } from 'react';
import Country from "../Country";
import OneCountry from "./OneCountry";

const None = () => {
    return (
        <p>Too many matches, specify another filter</p>
    )
}

const Render = ({ countries }) => {
    const length = countries.length;
    console.log('inside render:', length, ' match.', countries[0])
    if (length > 10) {
        return (
            <None />
        )
    }
    else if (length > 1 && length <= 10) {
        return (
            <div>
                {countries.map(country => (
                    <Country key={country.name.common} country={country} />
                ))}
            </div>
        )
    }
    else if (length === 1) {
        return (
            <OneCountry country={countries[0]}/>
        )
    }
}

export default Render;