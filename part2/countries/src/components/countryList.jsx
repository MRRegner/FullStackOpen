import React from 'react'

const CountryList = ({ countriesToShow,handleCountryFilter }) => (

    <div>
        {countriesToShow.map(country => (
            <>
                <p key={country.name.common}>{country.name.common}   
                <button key={country.ccn3} onClick={handleCountryFilter} value={country.name.common}>show</button>
                
                </p>
                
            </>
        ))}
    </div>

)

export default CountryList