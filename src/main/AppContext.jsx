import { createContext, useReducer, useState } from 'react';

export const AppContext = createContext();

export const ADD = 'ADD';
export const DONE = 'DONE';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

const tasksList = [
    { id: 0, name: 'Wywiesić pranie', done: false },
    { id: 1, name: 'Zrobić obiad', done: false },
    { id: 2, name: 'Pójść na spacer ', done: false },
];

const toDoListReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return [...state, action.newTask];
        case DONE:
            return state.map(task => {
                if (task.id === action.id) {
                    task.done = true;
                }
                return task;
            });

        case EDIT:
            return action.editedTasks;
        case REMOVE:
            return state.filter(task => task.id !== action.id);

        default:
            throw new Error('Something went wrong');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toDoListReducer, tasksList);

    const [isModalActive, setIsModalActive] = useState(false);
    const [taskId, setTaskId] = useState(null);

    const toggleModalVisibility = () => setIsModalActive(!isModalActive);
    const getTaskId = id => setTaskId(id);

    return (
        <AppContext.Provider
            value={{
                dispatch,
                getTaskId,
                isModalActive,
                state,
                taskId,
                toggleModalVisibility,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
