import React from 'react';
import TodoListProvider from './store/TodoList/TodoList.context';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TasksList/TasksList';
import './App.scss';

const App = () => {
    return (
        <div className="toDo">
            <div className="toDo__container">
                <h1 className="toDo__header">todo app</h1>
                <TodoListProvider>
                    <AddTask />
                    <TaskList />
                </TodoListProvider>
            </div>
        </div>
    );
};

export default App;
