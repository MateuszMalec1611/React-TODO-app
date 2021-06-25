import { createContext, useReducer, useEffect } from 'react';
import { fetchAllTodoTasks, fetchAllDoneTasks } from './TodoList.services';
import { ADD, CHANGE_ORDER_TODO, CHANGE_ORDER_DONE, DONE, EDIT, ERROR, SET_TODO_DATA, SET_DONE_DATA, REMOVE, LOADING } from './TodoList.actions';
import { prepareData } from '../../utils/prepareData';

export const TodoListContext = createContext();

const initialState = {
    todoListTodo: [],
    todoListDone: [],
    isLoading: false,
    error: undefined,
};

const toDoListReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_TODO_DATA:
            return {
                ...state,
                todoListTodo: payload ?? [],
                isLoading: false,
            };

        case SET_DONE_DATA:
            return {
                ...state,
                todoListDone: payload ?? [],
                isLoading: false,
            };
        case ADD:
            return {
                ...state,
                todoList: [...state.todoListTodo, payload],
                isLoading: false,
            };
        case CHANGE_ORDER_TODO:
            return {
                ...state,
                todoListTodo: payload,
                isLoading: false,
            }

        case CHANGE_ORDER_DONE:
            return {
                ...state,
                todoListDone: payload,
                isLoading: false,
            }
        case DONE:   
            return {
                ...state,
                todoListTodo: payload.newTodoList,
                todoListDone: payload.newDoneList,
                isLoading: false,
            };
        case EDIT:
            const newTodoListTodo = state.todoListTodo.map(todo => {
                if (todo.id === payload.id) todo = payload;
                return todo;
            });
            return {
                ...state,
                todoListTodo: newTodoListTodo,
                isLoading: false,
            };
        case REMOVE:
            const newTasksListTodo = payload.value ? state.todoListTodo.filter(todo => todo.id !== payload.id) : state.todoListTodo;
            const newTasksListDone = !payload.value ? state.todoListDone.filter(todo => todo.id !== payload.id) : state.todoListDone;
            return {
                ...state,
                todoListTodo: newTasksListTodo,
                todoListDone: newTasksListDone,
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

    const setTodoTasks = async () => {
        dispatch({ type: LOADING, payload: true });
        try {
            const tasks = await fetchAllTodoTasks();
            dispatch({ type: SET_TODO_DATA, payload: prepareData(tasks) });
        } catch (err) {
            dispatch({ type: ERROR, payload: err });
        }
    };

    const setDoneTasks = async () => {
        dispatch({ type: LOADING, payload: true });
        try {
            const tasks = await fetchAllDoneTasks();
            dispatch({ type: SET_DONE_DATA, payload: prepareData(tasks) });
        } catch (err) {
            dispatch({ type: ERROR, payload: err });
        }
    };

    useEffect(() => {
        setTodoTasks();
        setDoneTasks();
    }, []);

    return (
        <TodoListContext.Provider
            value={{
                dispatch,
                todoListState,
                setTodoTasks,
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

export default TodoAppProvider;
