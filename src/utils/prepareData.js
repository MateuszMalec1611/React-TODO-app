export const prepareData = (data) => {
  const todoList = [];

  for (const [key, value] of Object.entries(data)) {
    todoList.push({
      id: key,
      ...value
    })
  }

  return todoList;
}