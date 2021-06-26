import React, { useContext } from 'react';
import {
    CHANGE_LIST_ORDER,
    ERROR,
    LOADING,
} from '../../store/TodoList/TodoList.actions';
import { changeOrder } from '../../store/TodoList/TodoList.services';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { TODO_LIST, DONE_LIST } from './TaskListType';
import Loader from '../Loader/Loader';
import Task from '../Task/Task';
import './TasksList.scss';

const TasksList = () => {
    const {
        dispatch,
        todoListState: { todoListTodo, todoListDone, isLoading },
    } = useContext(TodoListContext);

    //DRAG AND DROP
    const onDragEnd = async result => {
        const { destination, source } = result;
        if (!destination) return;
        
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;
        
        const start = source.droppableId;
        const finish = destination.droppableId;

        if (start === finish) {
            if (source.droppableId === TODO_LIST) {
                dispatch({ type: LOADING, payload: true });

                const newTasksOrderTodo = [...todoListTodo];
                const task = newTasksOrderTodo.splice(source.index, 1);
                newTasksOrderTodo.splice(destination.index, 0, ...task);
                newTasksOrderTodo.forEach((item, order) => item.order = order);
               
                try {
                    await newTasksOrderTodo.forEach(task => changeOrder(task, true, false));
                    dispatch({ type: CHANGE_LIST_ORDER, payload: {newTasksOrderTodo, newTasksOrderDone: todoListDone } });
                } catch (err) {
                    dispatch({ type: ERROR, payload: err + 'order' });
                }
            } else {
                dispatch({ type: LOADING, payload: true });

                const newTasksOrderDone = [...todoListDone];
                const task = newTasksOrderDone.splice(source.index, 1);
                newTasksOrderDone.splice(destination.index, 0, ...task);
                newTasksOrderDone.forEach((item, order) => item.order = order);

                try {
                    await newTasksOrderDone.forEach(task => changeOrder(task, false, false));
                    dispatch({ type: CHANGE_LIST_ORDER, payload: { newTasksOrderDone, newTasksOrderTodo: todoListTodo } });
                } catch (err) {
                    dispatch({ type: ERROR, payload: err });
                }
            }
        } else if (start === TODO_LIST && finish === DONE_LIST) {
            dispatch({ type: LOADING, payload: true });

            const newTasksOrderTodo = [...todoListTodo];
            const newTasksOrderDone = [...todoListDone];
            const task = newTasksOrderTodo.splice(source.index, 1);
            task[0].done = !task[0].done;

            newTasksOrderDone.splice(destination.index, 0, ...task);
            newTasksOrderDone.forEach((item, order) => item.order = order);
            newTasksOrderTodo.forEach((item, order) => item.order = order);

            try {
                await newTasksOrderTodo.forEach(task => changeOrder(task, true, 'order'));
                await newTasksOrderDone.forEach(task => changeOrder(task, false, 'order'));
                dispatch({ type: CHANGE_LIST_ORDER, payload: { newTasksOrderDone, newTasksOrderTodo } });
            } catch (err) {
                dispatch({ type: ERROR, payload: err });
            }

        } else if (start === DONE_LIST && finish === TODO_LIST) {
            dispatch({ type: LOADING, payload: true });

            const newTasksOrderDone = [...todoListDone];
            const newTasksOrderTodo = [...todoListTodo];
            const task = newTasksOrderDone.splice(source.index, 1);
            task[0].done = !task[0].done;

            newTasksOrderTodo.splice(destination.index, 0, ...task);
            newTasksOrderDone.forEach((item, order) => item.order = order);
            newTasksOrderTodo.forEach((item, order) => item.order = order);

            try {
                await newTasksOrderTodo.forEach(task => changeOrder(task, true, 'order'));
                await newTasksOrderDone.forEach(task => changeOrder(task, false, 'order'));
                dispatch({ type: CHANGE_LIST_ORDER, payload: { newTasksOrderDone, newTasksOrderTodo } });
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
                <Droppable droppableId={TODO_LIST}>
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

                <Droppable droppableId={DONE_LIST}>
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
