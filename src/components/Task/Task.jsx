import React, { useContext } from 'react';

import { TodoAppContext, REMOVE, DONE } from '../../Store/TodoListContext';

import './Task.scss';

const Task = props => {
    const { toggleModalVisibility, getTaskId } = useContext(TodoAppContext);
    const { id, name, done, onClickHandler } = props;

    const handleDelete = () => onClickHandler({ id, type: REMOVE });
    const handleDone = () => onClickHandler({ id, type: DONE });
    const handleEdit = () => {
        getTaskId(id);
        toggleModalVisibility();
    };

    const taskToDo = (
        <li className="task">
            <p className="task__title">{name}</p>
            <div className="task__btn-box">
                <button onClick={handleDone} className="task__btn-box-btn">
                    done
                </button>
                <button onClick={handleEdit} className="task__btn-box-btn">
                    edit
                </button>
                <button onClick={handleDelete} className="task__btn-box-btn">
                    x
                </button>
            </div>
        </li>
    );

    const taskDone = (
        <li className="task">
            <p className="task__title task__title--done">{name}</p>
            <div className="task__btn-box">
                <button
                    onClick={handleDelete}
                    className="task__btn-box-btn task__btn-box-btn--done">
                    x
                </button>
            </div>
        </li>
    );

    return <>{!done ? taskToDo : taskDone}</>;
};

export default Task;
