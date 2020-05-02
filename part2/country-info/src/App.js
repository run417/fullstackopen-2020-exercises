import React, { useState, useEffect } from 'react';
import axios from 'axios'
const weather_api_key = process.env.REACT_APP_API_KEY

const DisplayCountry = (props) => {
  const {country} = props;
  const [weather, setWeather] = useState({});
  const [icons, setIcons] = useState([]);
  const flagImageStyle = {
    width: '200px',
    height: 'auto'
  };

  const getMph = (kph) => {
    if (typeof kph === 'undefined' ) return 'N/A';
    return ((kph / 1.609344).toFixed(2)).toString()
  }

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
        setIcons(response.data.current.weather_icons)
        console.log(response.data)
      })
  }, [country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital - {country.capital}</p>
      <p>population - {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages
          .map(language => <li key={language.iso639_2}>{language.name}</li>)
        }
      </ul>

      <div style={flagImageStyle}>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width="100%"
        />
      </div>

      {console.log(icons)}

      {/* weather component */}
      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature: </strong>{weather.temperature}</p>
      {/* improve alt description */}
      {icons
        .map((icon, i) => <img key={i} src={icon} alt="weather" />)
      }
      <p>
        <strong>wind: </strong>{getMph(weather.wind_speed)} mph
        direction {weather.wind_dir}
      </p>
    </div>
  )
}


const DisplayList = (props) => {
  const {countries, handleClick} = props;
  if (countries.length > 10) {
    return ( <div>Too many matches, specify another filter</div>)
  } else {
    return (
      <div>
        <ul>
          {countries
            .map((country, i) =>
              <li
                  key={country.numericCode}>{country.name}
                  <ShowDetailsBtn handleClick={handleClick} index={i} />
              </li>)
          }
        </ul>
      </div>
    )
  }
}

const ShowDetailsBtn = ( {handleClick, index} ) =>
  <button onClick={() => handleClick(index)}>show</button>

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  console.log('render');

  const findCountries = (event) => {
    const name = event.target.value;
    if (name === '') {
      setFiltered([]);
      return;
    }
    const filtered = countries
      .filter(country => ((country.name).toLowerCase().includes(name)))
    setFiltered(filtered)
  }

  const setFilteredCountry = (index) => {
    console.log(filtered[index]);
    setFiltered([filtered[index]])
  }

  return (
    <div>
      <label>find countries <input onChange={findCountries}/></label>
      {filtered.length === 1
        ? <DisplayCountry country={filtered[0]} />
        : <DisplayList countries={filtered} handleClick={setFilteredCountry} />
      }
    </div>
  )
}

export default App;
