import React, { useContext, useEffect, useRef, useState } from 'react';
import { EDIT, TodoAppContext } from '../../Store/TodoListContext';
import './TaskEdition.scss';

const TaskEdition = ({ switchComponent, id }) => {
    const { dispatch, state } = useContext(TodoAppContext);
    const task = state.find(task => task.id === id);

    const [inputValue, setInputValue] = useState(task.name);
    const inputEl = useRef();

    useEffect(() => inputEl.current.focus(), []);

    const chandleInput = event => setInputValue(event.target.value);
    const handleEdition = event => {
        event.preventDefault();
        if (inputValue.length < 2) return; //place for handle modal error

        const editedTasks = state.map(task => {
            if (task.id === id) task.name = inputValue;
            return task;
        });

        dispatch({ editedTasks, type: EDIT });
        switchComponent();
    };

    return (
        <form className="taskEdition" onSubmit={handleEdition}>
            <input
                ref={inputEl}
                className="taskEdition__input"
                onChange={chandleInput}
                value={inputValue}
                type="text"
            />
            <button onClick={switchComponent} className="taskEdition__btn">
                edit
            </button>
        </form>
    );
};

export default TaskEdition;
