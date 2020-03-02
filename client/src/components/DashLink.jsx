import React from 'react';
import { Link } from "react-router-dom";

const DashLink = ({title, page, classN}) => {
    return (
        <div className={`dashlink-wrapper ${classN}`}>
            <Link to={page}>
                <div className="dashlink">
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default DashLink
