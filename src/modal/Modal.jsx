import React, { useContext, useEffect, useState } from 'react';

import { AppContext, EDIT } from '../main/AppContext';

import './Modal.scss';

const Modal = () => {
    const { dispatch, isModalActive, state, taskId, toggleModalVisibility } =
        useContext(AppContext);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isModalActive) {
            const task = state.find(task => task.id === taskId);
            setInputValue(task.name);
        }
    }, [isModalActive, state, taskId]);

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
        setError(false);
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
                    <button className="modal__btn">edit</button>
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
