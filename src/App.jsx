import React from 'react';
import TodoAppProvider from './Store/TodoListContext';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TasksList/TasksList';
import './App.scss';

const App = () => {
    return (
        <div className="toDo">
            <div className="toDo__container">
                <h1 className="toDo__header">todo app</h1>
                <TodoAppProvider>
                    <AddTask />
                    <TaskList />
                </TodoAppProvider>
            </div>
        </div>
    );
};

export default App;
