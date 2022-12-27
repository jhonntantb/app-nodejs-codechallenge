import { CreateTransaction } from '../adapters/in/dtos/create-transaction.dto';

export interface ITransactionRequest {
  saveTransaction(transaction: CreateTransaction): Promise<any>;
  updateTransaction(): Promise<any>;
  createOrder(transaction: CreateTransaction): Promise<any>;
}
