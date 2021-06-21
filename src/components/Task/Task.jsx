import React, { useState, useContext } from 'react';
import { REMOVE, DONE, LOADING, EDIT } from '../../store/TodoList/TodoList.actions';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { editTask } from '../../store/TodoList/TodoList.services';
import TaskEdition from '../TaskEdition/TaskEdition';
import './Task.scss';

const Task = ({ task, task: { id, name, done } }) => {
    const { dispatch, todoListState: { todoList, isLoading } } = useContext(TodoListContext);
    const [editingTask, setEditingTask] = useState({
        isEditing: false,
        name: ''
    });

    const handleDelete = async () => {
        dispatch({ type: REMOVE, payload: id });
    }
    const handleDone = async () => {
        dispatch({ type: LOADING, payload: true });

        const doneTask = {
            ...task,
            done: true
        }

        try {
            await editTask(doneTask);
            dispatch({ type: DONE, payload: doneTask });
        } catch (err) {
            dispatch({ type: LOADING, payload: false });
            console.error(err);
        }
    }
    const handleEditionComponent = async () => {
        if (editingTask.isEditing) {
            const newTask = {
                ...task,
                name: editingTask.name
            }

            try {
                await editTask(newTask);
                dispatch({ type: EDIT, payload: newTask })
            } catch (err) {
                dispatch({ type: LOADING, payload: false });
                console.error(err);
            }
            setEditingTask({ ...editingTask, isEditing: false });
            return;
        }
        setEditingTask({ isEditing: true, name });
    };

    const handleNameChange = ({ target: { value } }) => setEditingTask({ ...editingTask, name: value });

    const taskToDoElements = (
        <>
            {
                editingTask.isEditing
                    ? <input type="text" value={editingTask.name} onChange={handleNameChange} />
                    : <p className="task__title" onClick={handleEditionComponent}>{name}</p>
            }
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
            {taskToDoElements}
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
