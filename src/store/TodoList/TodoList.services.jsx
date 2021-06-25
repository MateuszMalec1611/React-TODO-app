import api from '../../api';

export const fetchAllTodoTasks = async () => {
    const { data } = await api().get('/Todo/todo.json');
    return data;
};
export const fetchAllDoneTasks = async () => {
    const { data } = await api().get('/Todo/done.json');
    return data;
};

export const addTask = async task => {
    await api().post(`/Todo/todo.json`, task);
    
};
export const setDoneOrTodo = async (task, value) => {
    if (value) {
        await api().put(`/Todo/done/${task.id}.json`, task);
        await api().delete(`/Todo/todo/${task.id}.json`);
    } else if (!value) {
        await api().put(`/Todo/todo/${task.id}.json`, task);       
        await api().delete(`/Todo/done/${task.id}.json`);
    }
};

export const changeOrder = async (tasks, value) => {
    if(value) await api().put(`/Todo/todo.json`, tasks);
    if(!value) await api().put(`/Todo/done.json`, tasks);
};

export const editTask = async task => {
    await api().put(`/Todo/todo/${task.id}.json`, task);
};

export const removeTask = async (id, value) => {
    if(value) await api().delete(`/Todo/todo/${id}.json`);
    if(!value) await api().delete(`/Todo/done/${id}.json`); 
};
