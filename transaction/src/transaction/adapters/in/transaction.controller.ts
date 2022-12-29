import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';
import { TransactionPersistenceService } from '../out/transaction-persistence.service';
import { TransactionResponseMapper } from './mapper-transaction-res';
import {
  TransactionRequest,
  CreatedTransaction,
  ResponseTransaction,
} from './dtos/create-transaction.dto';

const entity = 'transaction';
@ApiTags(entity)
@Controller({
  path: entity,
  version: '1',
})
export class TransactionController {
  private transactionRequest: ITransactionRequest;

  constructor(
    transactionPersitenceservice: TransactionPersistenceService,
    private mapperTransaction: TransactionResponseMapper,
  ) {
    this.transactionRequest = transactionPersitenceservice;
  }

  @Post()
  @ApiOkResponse({ type: ResponseTransaction })
  async saveTransaction(
    @Body()
    transaction: TransactionRequest,
  ) {
    const transactionRequest: CreatedTransaction = {
      ...transaction,
      status: 'pending',
    };
    const newTransaction = await this.transactionRequest.saveTransaction(
      transactionRequest,
    );

    return this.mapperTransaction.orderData(newTransaction);
  }
}
