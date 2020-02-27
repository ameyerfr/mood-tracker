import React from 'react';
import { Link } from "react-router-dom";

const DashLink = ({title,page,color}) => {
    return (
        <div className="dashlink-wrapper">
            <Link to={page}>
                <div className="dashlink" style={{backgroundColor:color}}>
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default DashLink
