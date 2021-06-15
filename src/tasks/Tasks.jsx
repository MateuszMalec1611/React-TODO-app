import React, { useContext } from 'react';

import { AppContext } from '../main/AppContext';
import Task from '../task/Task';

import './Tasks.scss';

const Tasks = () => {
    const { state, dispatch } = useContext(AppContext);

    //FILTER TASKS
    const tasksToDo = state.filter(task => !task.done);
    const tasksDone = state.filter(task => task.done);

    //CREATE TASKS COMPONENTS
    const allTasksToDo = tasksToDo.map(task => (
        <Task key={task.id} {...task} onClickHandler={dispatch} />
    ));

    const allTasksDone = tasksDone.map(task => (
        <Task key={task.id} {...task} onClickHandler={dispatch} />
    ));

    //RENDER TASKS
    const showTasksToDo =
        allTasksToDo.length === 0 ? (
            <p className="tasks-box__info">Brak zadań na liście</p>
        ) : (
            <ul className="tasks-box__ul">{allTasksToDo}</ul>
        );

    const showTasksDone =
        allTasksDone.length === 0 ? (
            <p className="tasks-box__info">Brak ukończonych zadań</p>
        ) : (
            <ul className="tasks-box__ul">{allTasksDone}</ul>
        );

    return (
        <div className="tasks-box">
            <h2 className="tasks-box__header">
                Tasks to do ({allTasksToDo.length === false ? '0' : allTasksToDo.length})
            </h2>
            {showTasksToDo}

            <h3 className="tasks-box__header--done">
                Done tasks ({allTasksDone.length === false ? '0' : allTasksDone.length})
            </h3>
            {showTasksDone}
        </div>
    );
};

export default Tasks;
