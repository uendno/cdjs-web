import React from 'react';
import notFoundImage from '../../assets/images/404.gif';
import './NotFound.css';

export default () => {
    return (
        <div className="not-found-component">
            <img className="not-found-image" src={notFoundImage}/>
        </div>
    )
}