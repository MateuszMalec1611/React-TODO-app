import { createContext, useReducer, useEffect } from 'react';
import { fetchAllTasks } from './TodoList.services';
import { ADD, DONE, EDIT, SET_DATA, REMOVE, LOADING } from './TodoList.actions';

export const TodoListContext = createContext();

const initialState = {
    todoList: [],
    isLoading: false,
    error: undefined
}

const toDoListReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_DATA:
            return {
                ...state,
                todoList: payload ?? [],
                isLoading: false
            };
        case LOADING:
            return {
                ...state,
                isLoading: payload
            };

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
    const [todoListState, dispatch] = useReducer(toDoListReducer, initialState);

    const setTasks = async () => {
        dispatch({ type: LOADING, payload: true });
        try {
            const tasks = await fetchAllTasks();

            dispatch({ type: SET_DATA, payload: tasks })
        } catch (err) {
            dispatch({ type: LOADING, payload: false });
            console.error(err);
        }

    }

    useEffect(() => {
        setTasks();
    }, [])

    return (
        <TodoListContext.Provider
            value={{
                dispatch,
                todoListState,
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

export default TodoAppProvider;
