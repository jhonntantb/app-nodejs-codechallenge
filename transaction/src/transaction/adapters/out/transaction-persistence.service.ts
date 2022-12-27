/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';
import { CreateTransaction } from '../in/dtos/create-transaction.dto';
import { TransactionPostgresService } from './transaction-postgres.service';

@Injectable()
export class TransactionPersistenceService implements ITransactionRequest {
  constructor(
    private transactionPostgresService: TransactionPostgresService,
    @Inject('ANTIFRAUD_SERVICE') private readonly antiFraudService: ClientKafka
  ){}

  async saveTransaction(transaction: CreateTransaction): Promise<any> {
    return this.transactionPostgresService.saveTransaction(transaction);
  }

  async updateTransaction(): Promise<any> {
    return this.transactionPostgresService.updateTransaction();
  }
  async createOrder(transaction: CreateTransaction): Promise<any> {
    this.antiFraudService.emit('order_created', transaction)
  }
}
