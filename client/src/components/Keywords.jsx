import React from 'react'

const Keywords = ({title}) => {
    return (
        <div>
            {title}
            <input className="input is-rounded" type="text" placeholder="Enter keywords..."></input>
        </div>
    )
}

export default Keywords
