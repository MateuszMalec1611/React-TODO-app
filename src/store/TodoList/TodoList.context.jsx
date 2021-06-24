import { createContext, useReducer, useEffect } from 'react';
import { fetchAllTasks } from './TodoList.services';
import { ADD, CHANGE_ORDER, DONE, EDIT, ERROR, SET_DATA, REMOVE, LOADING } from './TodoList.actions';
import { prepareData } from '../../utils/prepareData';

export const TodoListContext = createContext();

const initialState = {
    todoList: [],
    isLoading: false,
    error: undefined,
};

const toDoListReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_DATA:
            return {
                ...state,
                todoList: payload ?? [],
                isLoading: false,
            };
        case ADD:
            return {
                ...state,
                todoList: [...state.todoList, payload],
                isLoading: false,
            };
        case CHANGE_ORDER:
            return {
                ...state,
                todoList: payload,
                isLoading: false,
            }
        case DONE:   
            const editedTasks = state.todoList.map(todo => {
                if (todo.id === payload.id) todo.done = payload.value;
                return todo;
            });
            return {
                ...state,
                todoList: editedTasks,
                isLoading: false,
            };
        case EDIT:
            const newTodoList = state.todoList.map(todo => {
                if (todo.id === payload.id) todo = payload;
                return todo;
            });
            return {
                ...state,
                todoList: newTodoList,
                isLoading: false,
            };
        case REMOVE:
            const newTasksList = state.todoList.filter(todo => todo.id !== payload.id);
            return {
                ...state,
                todoList: newTasksList,
                isLoading: false,
            };
        case LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case ERROR:
            alert(payload)
            return {
                ...state,
                isLoading: false,
            };

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

            dispatch({ type: SET_DATA, payload: prepareData(tasks) });
        } catch (err) {
            dispatch({ type: ERROR, payload: err });
        }
    };

    useEffect(() => {
        setTasks();
    }, []);

    return (
        <TodoListContext.Provider
            value={{
                dispatch,
                todoListState,
                setTasks,
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

export default TodoAppProvider;
