export type Transaction = {
  id?: number;
  type: 'IN' | 'OUT';
  amount: number;
  destiny: string;
  date: string | null;
};
