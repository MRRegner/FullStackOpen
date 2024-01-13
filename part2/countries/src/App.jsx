import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import Filter from './components/filter'
import CountryDetail from './components/countryDetail'
import CountryList from './components/countryList'
import weatherModel from './components/weatherModel'

function App() {

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newMessage, setMessage] = useState('')
  const [weather, setWeather] = useState(weatherModel)
  const [countryLat, setCountryLat] = useState([])
  const [countryLng, setCountryLng] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${countryLat}&longitude=${countryLng}&current=temperature_2m,rain,wind_speed_10m,wind_direction_10m`)
      .then(response => {
        if ( response.data.length == 0 ) {
          console.log("NO DATA!")
      }else{
        setWeather(response.data.current)
      }
      })
  }, [countryLat])

  const handleCountryFilter = (event) => {

    function filterItems(arr, query) {
      return arr.filter((el) => el.name.common.toLowerCase().includes(query.toLowerCase()));
    }
    setFilter(event.target.value)

    const filteredCountries = filterItems(countries, event.target.value)

    if (filteredCountries.length > 10) {

      setCountriesToShow([])
      setMessage('Too many matches, specify another filter')

    } else if (filteredCountries.length === 1){

      setCountriesToShow(filteredCountries)
      setMessage('')
      setCountryLat(filteredCountries.map(country=> (country.capitalInfo.latlng[0])))
      setCountryLng(filteredCountries.map(country=> (country.capitalInfo.latlng[1])))
      
    }else{

      setCountriesToShow(filteredCountries)
      setMessage('')

    }

  }

  return (
    <>
      <Filter newfilter={newFilter} handleCountryFilter={handleCountryFilter} newMessage={newMessage} />

      {countriesToShow.length === 1 ?
        <CountryDetail countriesToShow={countriesToShow} weather={weather}/>
          :
        <CountryList countriesToShow={countriesToShow} handleCountryFilter={handleCountryFilter}/>
        }
    </>
  )

}

export default App
