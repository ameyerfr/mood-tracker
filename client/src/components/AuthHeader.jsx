import React from 'react';
import "../styles/header.css";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    return (
        <div className="authheader">
            <Link exact to="/">TamaMoodchi</Link>
        </div>
    )
}

export default AuthHeader
