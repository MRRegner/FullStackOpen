import React from 'react'
import Weather from './weather'
const CountryDetail = ({ countriesToShow, weather }) => (
    <div>
        {countriesToShow.map(country => (
            <>
                <h1 key={country.name.common}>{country.name.common}</h1>
                <p key={country.capital}>capital {country.capital}</p>
                <p key={country.population}>population {country.population}</p>
                <h2 key={country.cca2}>Spoken languages</h2>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
                <img key={country.flags.svg} src={country.flags.svg} alt={country.name.common} style={{ maxHeight: "100px" }} />
                <Weather country={country} weather={weather}/> 
            </>
        ))}
    </div>
)

export default CountryDetail