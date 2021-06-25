import React, { useContext } from 'react';
import {
    CHANGE_ORDER_TODO,
    CHANGE_ORDER_DONE,
    ERROR,
    LOADING,
} from '../../store/TodoList/TodoList.actions';
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
        todoListState: { todoListTodo, todoListDone, isLoading },
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

        const start = source.droppableId;
        const finish = destination.droppableId;

        if (start === finish) {
            if (source.droppableId === 'todo') {
                dispatch({ type: LOADING, payload: true });

                const newTasksOrder = todoListTodo;
                const task = newTasksOrder.splice(source.index, 1);
                newTasksOrder.splice(destination.index, 0, ...task);

                try {
                    await changeOrder(newTasksOrder, true);
                    dispatch({ type: CHANGE_ORDER_TODO, payload: newTasksOrder });
                } catch (err) {
                    dispatch({ type: ERROR, payload: err });
                }
            } else {
                dispatch({ type: LOADING, payload: true });

                const newTasksOrder = todoListDone;
                const task = newTasksOrder.splice(source.index, 1);
                newTasksOrder.splice(destination.index, 0, ...task);

                try {
                    await changeOrder(newTasksOrder, false);
                    dispatch({ type: CHANGE_ORDER_DONE, payload: newTasksOrder });    
                } catch (err) {
                    dispatch({ type: ERROR, payload: err });
                }
            }

        } else if (start === 'todo' && finish === 'done') {
            dispatch({ type: LOADING, payload: true });

            const newTasksOrderTodo = todoListTodo;
            const newTasksOrderDone = todoListDone;
            const task = newTasksOrderTodo.splice(source.index, 1);
            task[0].done = !task[0].done;

            newTasksOrderDone.splice(destination.index, 0, ...task);

            dispatch({ type: CHANGE_ORDER_TODO, payload: newTasksOrderTodo });
            dispatch({ type: CHANGE_ORDER_DONE, payload: newTasksOrderDone });

            try {
                await changeOrder(newTasksOrderTodo, true);
                await changeOrder(newTasksOrderDone, false);
                dispatch({ type: CHANGE_ORDER_TODO, payload: newTasksOrderTodo });
                dispatch({ type: CHANGE_ORDER_DONE, payload: newTasksOrderDone });
            } catch (err) {
                dispatch({ type: ERROR, payload: err });
            }

        } else if (start === 'done' && finish === 'todo') {
            dispatch({ type: LOADING, payload: true });

            const newTasksOrderDone = todoListDone;
            const newTasksOrderTodo = todoListTodo;
            const task = newTasksOrderDone.splice(source.index, 1);
            task[0].done = !task[0].done;

            newTasksOrderTodo.splice(destination.index, 0, ...task);

            try {
                await changeOrder(newTasksOrderTodo, true);
                await changeOrder(newTasksOrderDone, false);
                dispatch({ type: CHANGE_ORDER_TODO, payload: newTasksOrderTodo });
                dispatch({ type: CHANGE_ORDER_DONE, payload: newTasksOrderDone });
            } catch (err) {
                dispatch({ type: ERROR, payload: err });
            }

        }
    };

    //CREATE TASKS COMPONENTS
    const renderTasksToDo = todoListTodo.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
    ));

    const renderTasksDone = todoListDone.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
    ));

    //INSOLATE COMPONENTS INTO DONE AND TO DO
    const showTasksToDo = !todoListTodo.length ? (
        <p className="tasks-box__info">No tasks on the list</p>
    ) : (
        <ul className="tasks-box__ul">{renderTasksToDo}</ul>
    );

    const showTasksDone = !todoListDone.length ? (
        <p className="tasks-box__info">No tasks completed</p>
    ) : (
        <ul className="tasks-box__ul">{renderTasksDone}</ul>
    );

    //COMPONENT TO RENDER
    const tasksFullList = (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="tasks-box">
                <Droppable droppableId="todo">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="tasks-box-todo">
                            <h2 className="tasks-box__header">
                                Tasks to do ({todoListTodo.length})
                            </h2>
                            {showTasksToDo}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="done">
                    {provided => (
                        <div
                            className="tasks-box-done"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <h3 className="tasks-box__header--done">
                                Done tasks ({todoListDone.length})
                            </h3>
                            {showTasksDone}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
    return <>{isLoading ? <Loader /> : tasksFullList}</>;
};

export default TasksList;
