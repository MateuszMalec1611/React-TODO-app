import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

export const TodoAppContext = createContext();

export const GET_DATA = 'DATA';
export const ADD = 'ADD';
export const DONE = 'DONE';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

const toDoListReducer = (state, { type, Todo: tasks }) => {
    switch (type) {
        case GET_DATA:
            return tasks;

        // case ADD:
        //     return [...state, data.newTask];

        // case DONE:
        //     const tasks = state.map(task => {
        //         if (task.id === data.id) {
        //             task.done = true;
        //         }
        //         return task;
        //     });

        //     return tasks;

        // case EDIT:
        //     return data.editedTasks;

        // case REMOVE:
        //     const newTasksList = state.filter(task => task.id !== data.id);

        //     return newTasksList;

        default:
            throw new Error('Something went wrong');
    }
};

const TodoAppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toDoListReducer, []);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => fetchAllTasks(), 500);
    }, []);

    const fetchAllTasks = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_TASKS_API);
            dispatch({ type: GET_DATA, ...data });
            setLoading(false);
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <TodoAppContext.Provider
            value={{
                dispatch,
                loading,
                state,
            }}>
            {children}
        </TodoAppContext.Provider>
    );
};

export default TodoAppProvider;
