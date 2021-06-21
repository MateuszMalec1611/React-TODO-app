import React, { useContext } from 'react';
import { TodoAppContext } from '../../Store/TodoListContext';
import Task from '../Task/Task';
import Loader from '../Loader/Loader';
import './TasksList.scss';

const TasksList = () => {
    const { dispatch, loading, state } = useContext(TodoAppContext);

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

    //INSOLATE COMPONENTS INTO DONE AND TO DO
    const showTasksToDo =
        allTasksToDo.length === 0 ? (
            <p className="tasks-box__info">No tasks on the list</p>
        ) : (
            <ul className="tasks-box__ul">{allTasksToDo}</ul>
        );

    const showTasksDone =
        allTasksDone.length === 0 ? (
            <p className="tasks-box__info">No tasks completed</p>
        ) : (
            <ul className="tasks-box__ul">{allTasksDone}</ul>
        );
        
    //COMPONENT TO RENDER
    const tasksFullList = (
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
    return <>{loading ? <Loader /> : tasksFullList}</>;
};

export default TasksList;
