import React, { useState, useContext } from 'react';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { addTask } from '../../store/TodoList/TodoList.services';
import { ADD, ERROR, LOADING } from '../../store/TodoList/TodoList.actions';
import './AddTask.scss';

const AddTask = () => {
    const { dispatch, setTodoTasks, todoListState: { isLoading } } = useContext(TodoListContext);
    
    const [taskValue, setTaskValue] = useState('');
    const [taskError, setTaskError] = useState(false);

    const handleAddTaskValue = ({ target: { value } }) => setTaskValue(value);
    const handleaddTaskSubmit = async event => {
        event.preventDefault();
        if (taskValue.length < 2) {
            setTaskError(true);
            return;
        }
        dispatch({ type: LOADING, payload: true });
        
        const newTask = {
            name: taskValue,
            done: false,
            type: 'todo',
            id: null,
        };
        
        try {
            await addTask(newTask);
            dispatch({ type: ADD, payload: newTask });
            setTodoTasks();
        } catch (err) {
            dispatch({type: ERROR, payload: err});
        }
        
        setTaskValue('');
        setTaskError(false);
    };

    const preventEmptySubmit = event => {
        event.preventDefault();
        return;
    }
    

    return (
        <form onSubmit={isLoading ? preventEmptySubmit : handleaddTaskSubmit} className="addTask">
            <label className="addTask__label">
                Add task
                <input
                    onChange={handleAddTaskValue}
                    value={isLoading ? '' : taskValue}
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
