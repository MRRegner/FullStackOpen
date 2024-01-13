import React from 'react'

const Filter = ({newfilter, handlePersonFilter}) =>(


    <div>
    filter shown with <input value={newfilter} onChange={handlePersonFilter} />
    </div>

)

export default Filter