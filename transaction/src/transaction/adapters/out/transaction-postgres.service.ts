import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedTransaction } from '../in/dtos/create-transaction.dto';
import { ITransactionRepository } from './transaction.repository';
import { Repository } from 'typeorm';
import { Transaction } from '../../entity/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionPostgresService implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async saveTransaction(transaction: CreatedTransaction): Promise<any> {
    const newTransaction = this.transactionRepository.create(transaction);
    await this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async updateTransaction(id: string, body: any): Promise<any> {
    const transaction = {
      id,
      ...body,
    };
    const transactionModify = await this.transactionRepository.preload(
      transaction,
    );
    if (transactionModify) {
      return this.transactionRepository.save(transactionModify);
    }
    throw new NotFoundException(
      `the transaction with the id: ${id} was not found`,
    );
  }

  async getTransaction(id: string): Promise<any> {
    const transaction = await this.transactionRepository.find({
      where: {
        id: id,
      },
    });
    return transaction;
  }
}
