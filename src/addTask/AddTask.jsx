import React, { useState, useContext } from 'react';

import { AppContext, ADD } from '../main/AppContext';

import './AddTask.scss';

let ID = 3;

const AddTask = () => {
    const { dispatch } = useContext(AppContext);

    const [addTaskValue, setAddTaskValue] = useState('');
    const [addTaskError, setAddTaskError] = useState(false);

    const handleAddTaskValue = event => setAddTaskValue(event.target.value);
    const handleaddTaskSubmit = event => {
        event.preventDefault();
        if (addTaskValue.length < 2) {
            setAddTaskError(true);
            return;
        }

        const newTask = {
            id: ID,
            name: addTaskValue,
            done: false,
        };

        dispatch({ newTask, type: ADD });

        ID++;
        setAddTaskValue('');
        setAddTaskError(false);
    };

    return (
        <form onSubmit={handleaddTaskSubmit} className="addTask">
            <label className="addTask__label">
                Add task
                <input
                    onChange={handleAddTaskValue}
                    value={addTaskValue}
                    className="addTask__input"
                    type="text"
                />
            </label>
            {addTaskError && (
                <p className="addTask__error">The task must be at least 2 characters long</p>
            )}
            <button className="addTask__btn">add</button>
        </form>
    );
};

export default AddTask;
