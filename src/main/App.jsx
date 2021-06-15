import React from 'react';

import AppProvider from './AppContext';
import Modal from '../modal/Modal';
import Tasks from '../tasks/Tasks';

import './App.scss';

const App = () => {
    return (
        <div className="toDo">
            <div className="toDo__container">
                <AppProvider>
                    <Tasks />
                    <Modal />
                </AppProvider>
            </div>
        </div>
    );
};

export default App;
