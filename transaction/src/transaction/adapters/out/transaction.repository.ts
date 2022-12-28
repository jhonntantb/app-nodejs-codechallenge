import { CreatedTransaction } from '../in/dtos/create-transaction.dto';

export interface ITransactionRepository {
  saveTransaction(transaction: CreatedTransaction): Promise<any>;
  updateTransaction(id: string, body: any): Promise<any>;
}
