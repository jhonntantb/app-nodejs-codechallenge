import { CreatedTransaction } from '../adapters/in/dtos/create-transaction.dto';

export interface ITransactionRequest {
  saveTransaction(transaction: CreatedTransaction): Promise<any>;
  updateTransaction(id: string, body: any): Promise<any>;
  getTransaction(id: string): Promise<any>;
  createOrder(id: string, value: number);
}
