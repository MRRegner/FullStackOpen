import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
  
      axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        setCountry(response.data[0])
      })
      .catch((error) => {
        setCountry(null)
      })
  }, [name])
  
    return country
  }
  