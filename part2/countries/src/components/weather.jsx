import React from 'react'


const Weather= ( {country,weather })=>{

    return (
        <div>
            <h2>Weather in {country.capital} </h2>
            <p> Temperature {weather.temperature_2m} Celsius</p>
            <p> Wind {weather.wind_speed_10m} km/h Direction {weather.wind_direction_10m} °</p>
        </div>
    )
}

export default Weather