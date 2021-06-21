import api from '../../api';

export const fetchAllTasks = async () => {
  try {
    const { data } = await api().get('/Todo.json');

    return data;
  } catch (error) {
    return console.log(error);
  }
};