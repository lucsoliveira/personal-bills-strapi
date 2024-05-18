import { AxiosInstance } from 'axios';
import { Transaction } from '../types/transactions';

export const TransactionsServices = (apiClient: AxiosInstance) => ({
  filter: async ({
    pageSize,
    sortBy,
  }: {
    pageSize: number;
    sortBy?: string[];
  }) => {
    const sort = sortBy
      ? {
          sort: {
            ...sortBy,
          },
        }
      : {};

    const results = await apiClient.request({
      url: '/transactions?populate=*',
      params: {
        pagination: {
          pageSize,
        },
        ...sort,
      },
    });

    const data = results.data.data;
    const dataNormalized = data.map(
      (item: { id: number; attributes: Transaction }) => {
        return {
          id: item.id,
          ...item.attributes,
        };
      }
    );
    return {
      transactions: dataNormalized,
    };
  },
});
