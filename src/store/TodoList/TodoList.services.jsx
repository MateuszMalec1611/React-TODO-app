import api from '../../api';

export const fetchAllTasks = async () => {
  try {
    const { data } = await api().get('/Todo.json');

    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const addTask = async (task) => {
  try {
    await api().post(`/Todo.json`, task);
  } catch (error) {
    return console.log(error);
  }
};

export const editTask = async (task) => {
  try {
    await api().put(`/Todo/${task.id}.json`, task);
  } catch (error) {
    return console.log(error);
  }
};
