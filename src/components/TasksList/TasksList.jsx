import React, { useContext } from 'react';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import Task from '../Task/Task';
import Loader from '../Loader/Loader';
import './TasksList.scss';

const TasksList = () => {
    const { dispatch, todoListState: { todoList, isLoading } } = useContext(TodoListContext);

    //FILTER TASKS
    const tasksToDo = todoList.filter(task => !task.done);
    const tasksDone = todoList.filter(task => task.done);

    //CREATE TASKS COMPONENTS
    const renderTasksToDo = tasksToDo.map(task => (
        <Task key={task.id} task={task} key={task.id} />
    ));

    const renderTasksDone = tasksDone.map(task => (
        <Task key={task.id} task={task} key={task.id} />
    ));


    //INSOLATE COMPONENTS INTO DONE AND TO DO
    const showTasksToDo =
        !tasksToDo.length ? (
            <p className="tasks-box__info">No tasks on the list</p>
        ) : (
            <ul className="tasks-box__ul">{renderTasksToDo}</ul>
        );

    const showTasksDone =
        !tasksDone.length ? (
            <p className="tasks-box__info">No tasks completed</p>
        ) : (
            <ul className="tasks-box__ul">{renderTasksDone}</ul>
        );

    //COMPONENT TO RENDER
    const tasksFullList = (
        <div className="tasks-box">
            <h2 className="tasks-box__header">
                Tasks to do ({tasksToDo.length})
            </h2>
            {showTasksToDo}

            <h3 className="tasks-box__header--done">
                Done tasks ({tasksDone.length})
            </h3>
            {showTasksDone}
        </div>
    );
    return <>{isLoading ? <Loader /> : tasksFullList}</>;
};

export default TasksList;
