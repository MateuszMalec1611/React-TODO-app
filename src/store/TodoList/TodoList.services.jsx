import api from '../../api';

export const fetchAllTasks = async () => {
    const { data } = await api().get('/Todo.json');
    return data ?? [];
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

export const changeOrder = async (task, value, order) => {
    // IF ONLY ORDER IS TO CHANGE
    if (value) await api().put(`/Todo/todo/${task.id}.json`, task);
    if (!value) await api().put(`/Todo/done/${task.id}.json`, task);
    //IF ORDER AND STATE OF TODO , DONE
    if (!value && order) {
        await api().put(`/Todo/done/${task.id}.json`, task);
        await api().delete(`/Todo/todo/${task.id}.json`);
    } else if (value && order) {
        await api().put(`/Todo/todo/${task.id}.json`, task);       
        await api().delete(`/Todo/done/${task.id}.json`);
    }
};

export const editTask = async task => {
    await api().put(`/Todo/todo/${task.id}.json`, task);
};

export const removeTask = async (id, value) => {
    if (value) await api().delete(`/Todo/todo/${id}.json`);
    if (!value) await api().delete(`/Todo/done/${id}.json`);
};
