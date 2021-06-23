import api from '../../api';

export const fetchAllTasks = async () => {
        const { data } = await api().get('/Todo.json');
        return data;
};

export const addTask = async task => {
    await api().post(`/Todo.json`, task);
};

export const editTask = async task => {
    await api().put(`/Todo/${task.id}.json`, task);
};

export const removeTask = async task => {
        await api().delete(`/Todo/${task.id}.json`);
};
