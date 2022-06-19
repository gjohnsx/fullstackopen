import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneCountry from "./components/OneCountry";

const api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
    const [expandCountry, setExpandCountry] = useState(false);
    const [weatherData, setWeatherData] = useState([]);

    console.log('country props:', country);


    const capital = country.capital[0];
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then(response => {
                console.log('promise fulfilled');
                setWeatherData(response.data);
            })
    }, [expandCountry]);
    console.log('weatherData =>', weatherData);


    return (
        <div>
            <p className="country--name">{country.name.common}</p>
            <button 
                className="country--show-btn"
                onClick={() => setExpandCountry(!expandCountry)}
            >
                {expandCountry ? 'hide' : 'show'}
            </button>

            {expandCountry 
                ? <OneCountry 
                    key={country.name.common} 
                    country={country} 
                    weather={weatherData}
                    />
                : ''
            }
        </div>
    )
}

export default Country;