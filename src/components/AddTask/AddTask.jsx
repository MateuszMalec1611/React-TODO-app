import React, { useState, useContext } from 'react';
import { TodoAppContext, ADD } from '../../Store/TodoListContext';
import './AddTask.scss';

let ID = 3;

const AddTask = () => {
    const { dispatch } = useContext(TodoAppContext);

    const [taskValue, setTaskValue] = useState('');
    const [taskError, setTaskError] = useState(false);

    const handleAddTaskValue = event => setTaskValue(event.target.value);
    const handleaddTaskSubmit = event => {
        event.preventDefault();
        if (taskValue.length < 2) {
            setTaskError(true);
            return;
        }

        const newTask = {
            id: ID,
            name: taskValue,
            done: false,
        };

        dispatch({ newTask, type: ADD });

        ID++;
        setTaskValue('');
        setTaskError(false);
    };

    return (
        <form onSubmit={handleaddTaskSubmit} className="addTask">
            <label className="addTask__label">
                Add task
                <input
                    onChange={handleAddTaskValue}
                    value={taskValue}
                    className="addTask__input"
                    type="text"
                />
            </label>
            {taskError && (
                <p className="addTask__error">The task must be at least 2 characters long</p>
            )}
            <button className="addTask__btn">add</button>
        </form>
    );
};

export default AddTask;
