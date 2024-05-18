import axios from 'axios';
import { TransactionsServices } from './transactions';

export const api = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.TOKEN_API}`,
  },
});

export const TRANSACTIONS_SERVICES = TransactionsServices(apiClient);
