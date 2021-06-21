import { createContext, useEffect, useReducer } from 'react';
import firebase from '../utils/firebase';

export const TodoAppContext = createContext();

export const GET_DATA = 'DATA';
export const ADD = 'ADD';
export const DONE = 'DONE';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

const toDoListReducer = (state, action) => {
    switch (action.type) {
        case GET_DATA:
            return action.todoList;

        case ADD:
            firebase.database().ref(`Todo/${action.newTask.id}`).set(action.newTask);
            return [...state, action.newTask];

        case DONE:
            const tasks = state.map(task => {
                if (task.id === action.id) {
                    task.done = true;
                }
                return task;
            });
            firebase.database().ref(`Todo/`).set(tasks);
            return tasks;

        case EDIT:
            firebase.database().ref(`Todo/`).set(action.editedTasks);
            return action.editedTasks;

        case REMOVE:
            const newTasksList = state.filter(task => task.id !== action.id);
            firebase.database().ref(`Todo/`).set(newTasksList);
            return newTasksList;

        default:
            throw new Error('Something went wrong');
    }
};

const TodoAppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toDoListReducer, []);

    useEffect(() => {
        const todoRef = firebase.database().ref('Todo/');
        todoRef.on('value', tasks => {
            let todoList = [];
            tasks.forEach(task => {
                todoList.push(task.val());
            });
            dispatch({ todoList, type: GET_DATA });
        });
    }, []);

    return (
        <TodoAppContext.Provider
            value={{
                dispatch,
                state,
            }}>
            {children}
        </TodoAppContext.Provider>
    );
};

export default TodoAppProvider;
