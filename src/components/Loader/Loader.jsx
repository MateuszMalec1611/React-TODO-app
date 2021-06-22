import React from 'react';
import './Loader.scss';

const Loader = () => {
    return (
        <div className="loading-mask">
            <div className="preloader">
                <div className="c-three-dots-loader"></div>
            </div>
        </div>
    );
};

export default Loader;
