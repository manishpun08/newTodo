import $axios from "./axios.instance";

export const getTaskDetails = async (id) => {
  return await $axios.get(`/details/${id}`);
};

export const deleteTask = async (taskId) => {
  return await $axios.delete(`/delete/${taskId}`);
};
