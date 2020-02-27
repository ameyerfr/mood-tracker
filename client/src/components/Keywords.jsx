import React from 'react'

const Keywords = ({title}) => {
    return (
        <div className="keywords-container">
            <label>{title}</label>
            <input className="inputKeywords input is-rounded" type="text" placeholder="Enter keywords..."></input>
            <div className="keywords"></div>
        </div>
    )
}

export default Keywords
