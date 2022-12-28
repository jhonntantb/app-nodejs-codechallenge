/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';
import { OrderCreatedEvent } from 'src/transaction/kafka-order/create-order.event';
import { CreatedTransaction } from '../in/dtos/create-transaction.dto';
import { TransactionPostgresService } from './transaction-postgres.service';

@Injectable()
export class TransactionPersistenceService implements ITransactionRequest {
  private statusTransaction: string;
  constructor(
    private transactionPostgresService: TransactionPostgresService,
    @Inject('ANTIFRAUD_SERVICE') private readonly antiFraudService: ClientKafka
  ){}

  async saveTransaction(transaction: CreatedTransaction): Promise<any> {
    this.createOrder(transaction);
    const newTransaction = await this.transactionPostgresService.saveTransaction(transaction);
    const response = this.updateTransaction(newTransaction.id, {status: this.statusTransaction})
    return response;
  }

  async updateTransaction(id: string, body: any): Promise<any> {
    return this.transactionPostgresService.updateTransaction(id,body);
  }
  createOrder(transaction: CreatedTransaction) {
    console.log('este es el valor de lo uq evakso enviar', transaction.value, transaction.status)
    this.antiFraudService.send('validate_information', new OrderCreatedEvent(transaction.value, transaction.status))
    .subscribe((information) => {
      console.log(information)
      this.statusTransaction= information
    })
  }
}
