import React, { useContext, useState } from 'react';

import { ACTION_TYPE } from '../main/AppContext';
import { AppContext } from '../main/AppContext';

import './Modal.scss';

const Modal = () => {
    const { dispatch, isModalActive, state, taskId, toggleModalVisibility } =
        useContext(AppContext);
    const [EDIT] = ACTION_TYPE;
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    //TEST
    if (!isModalActive && inputValue !== '') setInputValue('');

    // if (isModalActive && inputValue === '') {
    //     const text = taskToEdit.map(task => task.name);
    //     setInputValue(text);
    // }

    const handleInput = event => {
        setInputValue(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (inputValue.length < 2) {
            setError(true);
            return;
        }

        const editedTasks = state.map(task => {
            if (task.id === taskId) {
                task.name = inputValue;
            }
            return task;
        });

        dispatch({ editedTasks, type: EDIT });
        handleCancel();
    };

    const handleCancel = () => {
        toggleModalVisibility();
        setInputValue('');
        setError('');
    };

    return (
        <div className={isModalActive ? `modal modal--active` : `modal`}>
            <h3 className="modal__header">edit task</h3>
            <form onSubmit={handleSubmit}>
                <div className="modal__box">
                    <input
                        onChange={handleInput}
                        value={inputValue}
                        type="text"
                        className="modal__box-input"
                    />{' '}
                    <button className="modal__btn">add</button>
                </div>
                {error && (
                    <p className="modal__error">The task must be at least 2 characters long</p>
                )}
            </form>
            <button onClick={handleCancel} className="modal__btn modal__btn--cancel">
                cancel
            </button>
        </div>
    );
};

export default Modal;
