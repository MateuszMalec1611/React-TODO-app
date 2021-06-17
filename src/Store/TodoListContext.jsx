import { createContext, useReducer } from 'react';

export const TodoAppContext = createContext();

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
            if (action.newTask) {
                return [...state, action.newTask];
            } else {
                return;
            }
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

const TodoAppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toDoListReducer, tasksList);

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
