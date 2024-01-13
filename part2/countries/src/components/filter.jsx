import React from 'react'

const Filter = ({ newFilter, newMessage,handleCountryFilter }) => (


    <div>
        find countries <input value={newFilter} onChange={handleCountryFilter} />
        <p>{newMessage}</p>
    </div>

)

export default Filter