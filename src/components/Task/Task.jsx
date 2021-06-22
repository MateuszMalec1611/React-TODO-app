import React, { useState, useContext, useRef, useEffect } from 'react';
import { REMOVE, DONE, LOADING, EDIT } from '../../store/TodoList/TodoList.actions';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { editTask, removeTask } from '../../store/TodoList/TodoList.services';
import './Task.scss';

const Task = ({ task, task: { id, name, done } }) => {
    const { dispatch, todoListState: { isLoading } } = useContext(TodoListContext);
    const [editingTask, setEditingTask] = useState({
        isEditing: false,
        name: ''
    });
    const inputEl = useRef();
    // DELETE BTN
    const handleDelete = async () => {
        dispatch({type: LOADING, payload: true});

        try {
            await removeTask(task);
            dispatch({ type: REMOVE, payload: {id} });
        }catch (err) {
            console.log(err);
            dispatch({type: LOADING, payload: false});
        }

    }
    // DONE BTN
    const handleDone = async value => {
        const doneTask = {
            ...task,
            done: value
        }
        dispatch({type: LOADING, payload: true});
        
        try {
            await editTask(doneTask);
            dispatch({ type: DONE, payload: {id, value} });
        } catch (err) {
            console.error(err);
            dispatch({type: LOADING, payload: false});
        }
    }
    // EDITION BTN
    const handleEditionComponent = async () => {
        if (editingTask.isEditing) {
            inputEl.current.focus();
            if (checkInputValue()) return;
            
            const newTask = {
                ...task,
                name: editingTask.name
            }
            dispatch({type: LOADING, payload: true});
            
            try {
                await editTask(newTask);
                dispatch({ type: EDIT, payload: newTask })
            } catch (err) {
                console.error(err);
                dispatch({type: LOADING, payload: false});
            }
            setEditingTask({ ...editingTask, isEditing: false });
            return;
        }
        setEditingTask({ isEditing: true, name });
    };

    const handleNameChange = ({ target: { value } }) => setEditingTask({ ...editingTask, name: value });

    const checkInputValue = () => {
        if(editingTask.name.length < 2) return true;

        if(editingTask.name === name) {
            setEditingTask({isEditing: false});
            return true;
        }
    }
    useEffect(() => {
        if (editingTask.isEditing) inputEl.current.focus();
    },[editingTask.isEditing])

    

    // RENDER COMPONENTS
    const taskToDoElements = (
        <>
            {
                editingTask.isEditing
                    ? <input className="task__input" type="text" value={editingTask.name} onChange={handleNameChange} ref={inputEl}/>
                    : <p className="task__title" onClick={handleEditionComponent}>{name}</p>
            }
            <div className="task__btn-box">
                <button onClick={editingTask.isEditing ? null : () => handleDone(true)} className="task__btn-box-btn">
                    done
                </button>
                <button onClick={isLoading ? null : handleEditionComponent} className="task__btn-box-btn">
                    {editingTask.isEditing ? 'ok' : 'edit'}
                </button>
                <button onClick={editingTask.isEditing ? null : handleDelete} className="task__btn-box-btn">
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
                    onClick={() => handleDone(false)}
                    className="task__btn-box-btn task__btn-box-btn--undo">
                    undo
                </button>
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
