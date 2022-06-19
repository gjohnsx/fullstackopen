import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Render from './components/Render';
import './styles.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [matches, setMatches] = useState([]);

  // on first load, get all data from api
  useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountryData(response.data);
        });
  }, [])

  // re render the page when you notice that search has changed
  useEffect(() => {
    const copy = countryData.slice();
    const searchRegex = new RegExp(search, 'i');
    const filtered = copy.filter(country => searchRegex.test(country.name.common))
    
    setMatches(filtered);
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <div>
        find countries
        <input onChange={handleInputChange} />
  
        <Render countries={matches}/>

      </div>
    </div>
  );
}

export default App;
