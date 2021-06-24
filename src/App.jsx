import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
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
                    <DndProvider options={HTML5toTouch}>
                        <TaskList />
                    </DndProvider>
                </TodoListProvider>
            </div>
        </div>
    );
};

export default App;
