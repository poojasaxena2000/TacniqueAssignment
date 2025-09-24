



import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

export async function getUsers() {
  try {
    return await api.get('/users');
  } catch (err) {
    console.error('getUsers error', err);
    throw err;
  }
}

export async function getUser(id) {
  try {
    return await api.get(`/users/${id}`);
  } catch (err) {
    console.error('getUser error', err);
    throw err;
  }
}

export async function addUser(user) {
  try {
    return await api.post('/users', user);
  } catch (err) {
    console.error('addUser error', err);
    throw err;
  }
}

export async function updateUser(id, user) {
  try {
    return await api.put(`/users/${id}`, user);
  } catch (err) {
    console.error('updateUser error', err);
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    return await api.delete(`/users/${id}`);
  } catch (err) {
    console.error('deleteUser error', err);
    throw err;
  }
}
