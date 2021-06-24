import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useClickOutside } from 'react-click-outside-hook'
import { DONE, EDIT, ERROR, LOADING, REMOVE } from '../../store/TodoList/TodoList.actions';
import { TodoListContext } from '../../store/TodoList/TodoList.context';
import { editTask, removeTask } from '../../store/TodoList/TodoList.services';
import './Task.scss';
// import { TaskType } from './TaskType';

const Task = ({ task, index, task: { id, name, done } }) => {
    const { dispatch, todoListState: { isLoading } } = useContext(TodoListContext);
    // const {TASK_TODO, TASK_DONE} = TaskType;
    const [editingTask, setEditingTask] = useState({
        isEditing: false,
        name: ''
    });
    const [taskRef, hasClickedOutside] = useClickOutside();
    const inputRef = useRef();

    //DRAG AND DROP
   

    // DELETE BTN
    const handleDelete = async () => {
        dispatch({type: LOADING, payload: true});

        try {
            await removeTask(task);
            dispatch({ type: REMOVE, payload: { id } });
        }catch (err) {
            dispatch({type: ERROR, payload: err});
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
            dispatch({type: DONE, payload: { id, value }});
        } catch (err) {
            dispatch({type: ERROR, payload: err});
        }
    }

    // EDITION BTN
    const handleEditionComponent = useCallback(async () => {
        if (editingTask.isEditing) {
            inputRef.current.focus();
            // SIMPLE VALIDATION
            if(editingTask.name.length < 2) return true;
            if(editingTask.name === name) {
                setEditingTask({isEditing: false});
                return true;
            }
            
            const newTask = {
                ...task,
                name: editingTask.name
            }
            
            dispatch({type: LOADING, payload: true});
            
            try {
                await editTask(newTask);
                dispatch({ type: EDIT, payload: newTask });
            } catch (err) {
                dispatch({type: ERROR, payload: err});
            }
            setEditingTask({ ...editingTask, isEditing: false });
            return;
        }
        setEditingTask({ isEditing: true, name });
    }, [ dispatch, editingTask, name, task]);

    const handleNameChange = ({ target: { value } }) => setEditingTask({ ...editingTask, name: value });

    //FOCUS ON EDITING INPUT
    useEffect(() => {
        if (editingTask.isEditing) inputRef.current.focus();
    },[editingTask.isEditing]);

    //HANDLE CLICK OUTSIDE
    useEffect(() => {
        if(hasClickedOutside && editingTask.isEditing) handleEditionComponent();

    }, [editingTask.isEditing, handleEditionComponent, hasClickedOutside]);
    
    // RENDER COMPONENTS
    const taskToDoElements = (
        <>
            {
                editingTask.isEditing
                ? <input className="task__input" type="text" value={editingTask.name} onChange={handleNameChange} ref={inputRef}/>
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
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                     className="task" >
                    {taskToDoElements}
                </li>
            )}
        </Draggable>
    );
    
    const taskDone = (
        <li className="task" >
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
