import React from 'react';

import './Task.scss';

const Task = props => {
    const { name, important } = props;

    return (
        <li className="task-box">
            <p className="task-box__title">{name}</p>
            <div className="task-box__btn-box">
                <button className="task-box__btn">add</button>
                <button className="task-box__btn">edit</button>
                <button className="task-box__btn">x</button>
            </div>
        </li>
    );
};

export default Task;
