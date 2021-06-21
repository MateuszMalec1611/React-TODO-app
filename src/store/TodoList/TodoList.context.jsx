import { createContext, useReducer, useEffect } from 'react';
import { fetchAllTasks } from './TodoList.services';
import { ADD, DONE, EDIT, SET_DATA, REMOVE, LOADING } from './TodoList.actions';
import { prepareData } from '../../utils/prepareData';

export const TodoListContext = createContext();

const initialState = {
    todoList: [],
    isLoading: false,
    error: undefined
}

const toDoListReducer = (state, { type, payload }) => {
    console.log(payload);
    switch (type) {
        case SET_DATA:
            return {
                ...state,
                todoList: payload ?? [],
                isLoading: false
            };
        case ADD:
            return {
                ...state,
                todoList: [payload, ...state.todoList],
                isLoading: false
            };
        case EDIT:
            const newTodoList = state.todoList.map(todo => {
                if (todo.id === payload.id) todo = payload;
                return todo;
            })
            return {
                ...state,
                todoList: newTodoList,
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
            console.error('Something went wrong');
    }
};

const TodoAppProvider = ({ children }) => {
    const [todoListState, dispatch] = useReducer(toDoListReducer, initialState);

    const setTasks = async () => {
        dispatch({ type: LOADING, payload: true });
        try {
            const tasks = await fetchAllTasks();

            dispatch({ type: SET_DATA, payload: prepareData(tasks) })
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
