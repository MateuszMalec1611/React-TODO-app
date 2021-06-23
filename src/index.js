import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

ReactDOM.render(
    <React.StrictMode>
        <DndProvider options={HTML5toTouch}>
            <App />
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
