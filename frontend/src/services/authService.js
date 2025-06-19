import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/auth'
});

export async function login(email, password) {
  const response = await api.post('/login', { email, password });
  return response.data;
}
