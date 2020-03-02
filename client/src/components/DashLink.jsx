import React from 'react';
import { Link } from "react-router-dom";

const DashLink = ({title,page,color, gradient}) => {
    return (
        <div className="dashlink-wrapper">
            <Link to={page}>
                <div className="dashlink" style={{backgroundColor:color, border:color, borderRadius:"20px"}}>
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default DashLink
