import axios from 'axios';

export const axiosInstance = () => {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') as string;
  }

  const loginInstance = axios.create({
    baseURL: 'https://raisetech-memo-api.herokuapp.com/api',
    headers: { Authorization: `Bearer ${token}` },
  });
  return { loginInstance };
};
