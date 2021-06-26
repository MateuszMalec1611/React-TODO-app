import { createContext, useReducer, useEffect } from 'react';
import { fetchAllTasks  } from './TodoList.services';
import { ADD, CHANGE_LIST_ORDER, DONE, EDIT, ERROR, SET_DATA, REMOVE, LOADING } from './TodoList.actions';
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
        case SET_DATA:
            payload.todo && payload.todo.sort((a, b) => a.order - b.order);
            payload.done && payload.done.sort((a, b) => a.order - b.order);
            return {
                ...state,
                todoListTodo: payload.todo ?? [],
                todoListDone: payload.done ?? [],
                isLoading: false,
            };
        case ADD:
            return {
                ...state,
                todoList: [...state.todoListTodo, payload],
                isLoading: false,
            };
        case CHANGE_LIST_ORDER:
            return {
                ...state,
                todoListTodo: payload.newTasksOrderTodo,
                todoListDone: payload.newTasksOrderDone,
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

    const setTasks = async () => {
        dispatch({ type: LOADING, payload: true });
        try {
            const tasks = await fetchAllTasks();
            dispatch({ type: SET_DATA, payload: {todo: prepareData(tasks.todo), done: prepareData(tasks.done)} });
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
