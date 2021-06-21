import React, { useState, useContext } from 'react';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { addTask } from '../../store/TodoList/TodoList.services';
import { ADD } from '../../store/TodoList/TodoList.actions';
import './AddTask.scss';

let ID;

const AddTask = () => {
    const { dispatch } = useContext(TodoListContext);

    const [taskValue, setTaskValue] = useState('');
    const [taskError, setTaskError] = useState(false);

    const handleAddTaskValue = ({ target: { value } }) => setTaskValue(value);
    const handleaddTaskSubmit = async event => {
        event.preventDefault();
        if (taskValue.length < 2) {
            setTaskError(true);
            return;
        }

        const newTask = {
            name: taskValue,
            done: false,
        };

        try {
            await addTask(newTask);
        } catch (err) {
            console.error(err);
        }

        dispatch({ type: ADD, payload: newTask });

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
