import React, { useState } from 'react';

import Task from '../Task/Task';

import './Tasks.scss';

const Tasks = () => {
    const tasksList = [
        { id: 0, name: 'Wywiesić pranie', important: false },
        { id: 1, name: 'Zrobić obiad', important: false },
    ];

    const [tasks, setTasks] = useState(tasksList);

    const Alltasks = tasks.map(task => (
        <Task key={task.id} name={task.name} id={task.id} />
    ));

    return <ul className="tasks-box">{Alltasks}</ul>;
};

export default Tasks;
