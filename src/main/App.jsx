import React from 'react';

import AppProvider from './AppContext';
import AddTask from '../addTask/AddTask';
import Modal from '../modal/Modal';
import Tasks from '../tasksList/TasksList';

import './App.scss';

const App = () => {
    return (
        <div className="toDo">
            <div className="toDo__container">
                <h1 className="toDo__header">todo app</h1>
                <AppProvider>
                    <AddTask />
                    <Tasks />
                    <Modal />
                </AppProvider>
            </div>
        </div>
    );
};

export default App;