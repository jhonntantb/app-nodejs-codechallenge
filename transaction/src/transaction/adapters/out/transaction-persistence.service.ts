import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';

import { CreatedTransaction } from '../in/dtos/create-transaction.dto';
import { TransactionPostgresService } from './transaction-postgres.service';

@Injectable()
export class TransactionPersistenceService implements ITransactionRequest {
  private orderResponse = {};
  constructor(
    private transactionPostgresService: TransactionPostgresService,
    @Inject('TRANSACTION_SERVICE')
    private readonly transactionService: ClientKafka,
  ) {}

  async saveTransaction(transaction: CreatedTransaction): Promise<any> {
    const newTransaction =
      await this.transactionPostgresService.saveTransaction(transaction);
    const res = await this.createOrder(newTransaction.id, newTransaction.value);

    return res;
  }

  updateTransaction(id: string, body: any): Promise<any> {
    return this.transactionPostgresService.updateTransaction(id, body);
  }

  getTransaction(id: string): Promise<any> {
    return this.transactionPostgresService.getTransaction(id);
  }

  async onModuleInit() {
    this.transactionService.subscribeToResponseOf('validate_information');
    await this.transactionService.connect();
  }
  // creamos la orden y esperamos la respuesta del servicio anti-fraude
  async createOrder(id: string, value: number) {
    try {
      const res = await new Promise((resolve) => {
        this.transactionService
          .send('validate_information', {
            value: { id, value },
          })
          .subscribe(async (response) => {
            const updateTransaction = await this.updateTransaction(
              response.id,
              {
                status: response.status,
              },
            );
            resolve(updateTransaction);
          });
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
