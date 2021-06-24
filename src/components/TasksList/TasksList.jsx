import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import Task from '../Task/Task';
import Loader from '../Loader/Loader';
import './TasksList.scss';
import { TaskType } from '../Task/TaskType';

const TasksList = () => {
    const { todoListState: { todoList, isLoading }, } = useContext(TodoListContext);
    const { TASK_TODO, TASK_DONE } = TaskType;

    //DRAG AND DROP
    const [{ isOver: isTodoOver }, addToListRef] = useDrop({
        accept: TASK_TODO,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const [{ isOver: isDoneOver }, removeFromTodoListRef] = useDrop({
        accept: TASK_DONE,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    //FILTER TASKS
    const tasksToDo = todoList.filter(task => !task.done);
    const tasksDone = todoList.filter(task => task.done).reverse();

    //CREATE TASKS COMPONENTS
    const renderTasksToDo = tasksToDo.map(task => <Task key={task.id} task={task} />);

    const renderTasksDone = tasksDone.map(task => (
        <Task key={task.id} task={task} taskType="taskDone" />
    ));

    //INSOLATE COMPONENTS INTO DONE AND TO DO
    const showTasksToDo = !tasksToDo.length ? (
        <p className="tasks-box__info">No tasks on the list</p>
    ) : (
        <ul
            style={isDoneOver ? { borderBottom: '1px solid rgb(65 96 58)' } : null}
            className="tasks-box__ul">
            {renderTasksToDo}
        </ul>
    );

    const showTasksDone = !tasksDone.length ? (
        <p className="tasks-box__info">
            No tasks completed
        </p>
    ) : (
        <ul
            style={isTodoOver ? { borderBottom: '1px solid #430000' } : null}
            className="tasks-box__ul">
            {renderTasksDone}
        </ul>
    );

    //COMPONENT TO RENDER
    const tasksFullList = (
        <div className="tasks-box">
            <div ref={removeFromTodoListRef} className="tasks-box-todo">
                <h2 className="tasks-box__header">Tasks to do ({tasksToDo.length})</h2>
                {showTasksToDo}
            </div>
            <div ref={addToListRef} className="tasks-box-done">
                <h3 className="tasks-box__header--done">Done tasks ({tasksDone.length})</h3>
                {showTasksDone}
            </div>
        </div>
    );
    return <>{isLoading ? <Loader /> : tasksFullList}</>;
};

export default TasksList;
