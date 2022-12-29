import { CreatedTransaction } from '../adapters/in/dtos/create-transaction.dto';
// interface para la Persistencia que implementara la logica de negocio y el resultado de la base de datos
export interface ITransactionRequest {
  saveTransaction(transaction: CreatedTransaction): Promise<any>;
  updateTransaction(id: string, body: any): Promise<any>;
  getTransaction(id: string): Promise<any>;
  createOrder(id: string, value: number);
}
