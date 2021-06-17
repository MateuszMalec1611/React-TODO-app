import React, { useState } from 'react';
import { REMOVE, DONE } from '../../Store/TodoListContext';
import TaskEdition from '../TaskEdition/TaskEdition';
import './Task.scss';

const Task = props => {
    const [isEditing, setIsEditing] = useState(false);
    const { id, name, done, onClickHandler } = props;

    const handleDelete = () => onClickHandler({ id, type: REMOVE });
    const handleDone = () => onClickHandler({ id, type: DONE });
    const handleEditionComponent = () => setIsEditing(!isEditing);

    const taskToDoElements = (
        <>
            <p className="task__title">{name}</p>
            <div className="task__btn-box">
                <button onClick={handleDone} className="task__btn-box-btn">
                    done
                </button>
                <button onClick={handleEditionComponent} className="task__btn-box-btn">
                    edit
                </button>
                <button onClick={handleDelete} className="task__btn-box-btn">
                    x
                </button>
            </div>
        </>
    );

    const taskToDo = (
        <li className="task">
            {isEditing ? (
                <TaskEdition id={id} switchComponent={handleEditionComponent} />
            ) : (
                taskToDoElements
            )}
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
