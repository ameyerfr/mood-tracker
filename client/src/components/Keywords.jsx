import React from 'react'

const Keywords = ({title}) => {
    return (
        <div>
            {title}
            <input class="input is-rounded" type="text" placeholder="example: family, friends..."></input>
        </div>
    )
}

export default Keywords
