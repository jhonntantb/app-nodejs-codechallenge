import {
  Body,
  Controller,
  DefaultValuePipe,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ITransactionRequest } from 'src/transaction/aplication/transaction.request';
import { TransactionPersistenceService } from '../out/transaction-persistence.service';
import {
  TransactionRequest,
  CreatedTransaction,
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
    @Inject('ANTIFRAUD_SERVICE') private readonly antiFraudService: ClientKafka,
  ) {
    this.transactionRequest = transactionPersitenceservice;
  }

  @Post()
  async saveTransaction(
    @Body()
    transaction: TransactionRequest,
  ) {
    const transactionRequest: CreatedTransaction = {
      ...transaction,
      status: 'pending',
    };
    return this.transactionRequest.saveTransaction(transactionRequest);
  }
  onModuleInit() {
    this.antiFraudService.subscribeToResponseOf('validate_information');
  }
}
