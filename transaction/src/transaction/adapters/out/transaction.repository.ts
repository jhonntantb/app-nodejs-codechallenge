import { CreatedTransaction } from '../in/dtos/create-transaction.dto';
// interface para la interaccion con la base de datos
export interface ITransactionRepository {
  saveTransaction(transaction: CreatedTransaction): Promise<any>;
  updateTransaction(id: string, body: any): Promise<any>;
  getTransaction(id: string): Promise<any>;
}
