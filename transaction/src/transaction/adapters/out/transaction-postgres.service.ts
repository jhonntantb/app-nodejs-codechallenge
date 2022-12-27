import { Injectable } from '@nestjs/common';
import { CreateTransaction } from '../in/dtos/create-transaction.dto';
import { ITransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionPostgresService implements ITransactionRepository {
  async saveTransaction(transaction: CreateTransaction): Promise<any> {
    return transaction;
  }

  async updateTransaction(): Promise<any> {
    return;
  }
}
