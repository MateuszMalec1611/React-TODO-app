import React, { useContext } from 'react';
import { CHANGE_ORDER, ERROR, LOADING } from '../../store/TodoList/TodoList.actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { changeOrder } from '../../store/TodoList/TodoList.services';
import Task from '../Task/Task';
import Loader from '../Loader/Loader';
import './TasksList.scss';
// import { TaskType } from '../Task/TaskType';

const TasksList = () => {
    const {
        dispatch,
        todoListState: { todoList, isLoading },
    } = useContext(TodoListContext);
    // const { TASK_TODO, TASK_DONE } = TaskType;

    //DRAG AND DROP
    const onDragEnd = async result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTasksOrder = todoList;
        const task = newTasksOrder.splice(source.index, 1);
        newTasksOrder.splice(destination.index, 0, ...task);
        
        dispatch({type: LOADING, payload: true});
        console.log(newTasksOrder);
        
        try {
            await changeOrder(newTasksOrder);
            dispatch({type: CHANGE_ORDER, payload: newTasksOrder});
        } catch (err) {
            dispatch({type: ERROR, payload: err});
        }
    };

    //FILTER TASKS
    const tasksToDo = todoList.filter(task => !task.done);
    const tasksDone = todoList.filter(task => task.done).reverse();

    //CREATE TASKS COMPONENTS
    const renderTasksToDo = tasksToDo.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
    ));

    const renderTasksDone = tasksDone.map((task, index) => (
        <Task key={task.id} index={index} task={task} taskType="taskDone" />
    ));

    //INSOLATE COMPONENTS INTO DONE AND TO DO
    const showTasksToDo = !tasksToDo.length ? (
        <p className="tasks-box__info">No tasks on the list</p>
    ) : (
        <ul className="tasks-box__ul">{renderTasksToDo}</ul>
    );

    const showTasksDone = !tasksDone.length ? (
        <p className="tasks-box__info">No tasks completed</p>
    ) : (
        <ul className="tasks-box__ul">{renderTasksDone}</ul>
    );

    //COMPONENT TO RENDER
    const tasksFullList = (
        <div className="tasks-box">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="column1">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="tasks-box-todo">
                            <h2 className="tasks-box__header">
                                Tasks to do ({tasksToDo.length})
                            </h2>
                            {showTasksToDo}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="tasks-box-done">
                <h3 className="tasks-box__header--done">Done tasks ({tasksDone.length})</h3>
                {showTasksDone}
            </div>
        </div>
    );
    return <>{isLoading ? <Loader /> : tasksFullList}</>;
};

export default TasksList;
