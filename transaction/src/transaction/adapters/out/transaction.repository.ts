import { CreateTransaction } from '../in/dtos/create-transaction.dto';

export interface ITransactionRepository {
  saveTransaction(transaction: CreateTransaction): Promise<any>;
  updateTransaction(): Promise<any>;
}
