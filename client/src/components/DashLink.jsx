import React from 'react';
import { Link } from "react-router-dom";

const DashLink = ({title, page, classN}) => {
    return (
        <div className={`dashlink-wrapper ${classN}`}>
            <Link to={page}>
<<<<<<< HEAD
                <div className="dashlink" style={{backgroundColor:color, border:color, borderRadius:"20px"}}>
=======
                <div className="dashlink">
>>>>>>> a7349fca06ba239d1b52f074a7f44aa0a8e78e9d
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default DashLink
