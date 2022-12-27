import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';
import { TransactionPersistenceService } from '../out/transaction-persistence.service';
import { CreateTransaction } from './dtos/create-transaction.dto';

const entity = 'transaction';
@ApiTags(entity)
@Controller({
  path: entity,
  version: '1',
})
export class TransactionController {
  private transactionRequest: ITransactionRequest;

  constructor(transactionPersitenceservice: TransactionPersistenceService) {
    this.transactionRequest = transactionPersitenceservice;
  }

  @Post()
  async saveTransaction(@Body() transaction: CreateTransaction) {
    return this.transactionRequest.saveTransaction(transaction);
  }
}
