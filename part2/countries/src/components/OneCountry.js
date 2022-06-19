import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Language = ({ name }) => {
    return (
        <li>{name}</li>
    )
}

const getWeather = (props) => {
    console.log('*** inside getWeather ***')
    const lat = props.latlng[0];
    const lon = props.latlng[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;
    const promise = axios.get(url)
    promise.then(response => {
        const weatherData = response.data;
        console.log(weatherData)
        return weatherData;
        // return {
        //     temp: weatherData["main"]["temp"],
        //     wind: weatherData["wind"]["speed"],
        //     imgSrc: `https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`
        // }
    })
}


const Weather = (props) => {
    console.log('INSIDE Weather Component:\n', props);
    return (
        <div>
            {/* <p>temperature {props.weather.temp} Fahrenheit</p>
            <img src={props.weather.imgSrc} />
            <p>wind {props.weather.wind} mph</p> */}
            <p>temperature xx Fahrenheit</p>
            <img src='' />
            <p>wind x mph</p>
        </div>
    )
}

const OneCountry = ({ country }) => {
    const [weatherData, setWeatherData] = useState({});

    const capital = country.capital[0];
    const languages = country.languages;
    const langKeys = Object.keys(country.languages);
    console.log(country);

    // get weather info:
    console.log('---- getting weather info ---- ');
    // const weather = getWeather(country);
    // setWeatherData(getWeather(country));
    useEffect(() => {
        setWeatherData(getWeather(country));
        console.log('weather data =', weatherData);
    }, [])

    return(
        <div>
            <h1>{country.name.common}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>capital</td>
                        <td>{country.capital}</td>
                    </tr>
                    <tr>
                        <td>area</td>
                        <td>{country.area}</td>
                    </tr>
                </tbody>
            </table>

            <h3>languages:</h3>
            <ul>
                {langKeys.map(lang => {
                    return <Language key={lang} name={languages[lang]} />
                })}
            </ul>
            
            <img className='flag' src={country.flags["png"]} />

            <h2>Weather in {capital}</h2>
            <Weather weather={weatherData}/>
            <hr />
        </div>
    )
}

export default OneCountry;