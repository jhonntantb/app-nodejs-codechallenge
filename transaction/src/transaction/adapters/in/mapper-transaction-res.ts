import { Injectable } from '@nestjs/common';
import { ResponseTransactionDB } from './dtos/create-transaction.dto';

@Injectable()
export class TransactionResponseMapper {
  async orderData(data: ResponseTransactionDB) {
    const response = {
      transactionExternalId: data.id,
      transactionType: {
        name: data.tranferTypeId === 1 ? 'deposite' : 'transfer',
      },
      transactionStatus: {
        name: data.status,
      },
      value: data.value,
      createdAt: data.createdAt,
    };

    return response;
  }
}
