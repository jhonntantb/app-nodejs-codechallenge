import { ApiProperty, OmitType } from '@nestjs/swagger';

export class TransactionRequest {
  @ApiProperty()
  accountExternalIdDebit: string;

  @ApiProperty()
  accountExternalIdCredit: string;

  @ApiProperty()
  tranferTypeId: number;

  @ApiProperty()
  value: number;
}

export class CreatedTransaction {
  @ApiProperty()
  accountExternalIdDebit: string;

  @ApiProperty()
  accountExternalIdCredit: string;

  @ApiProperty()
  tranferTypeId: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  status: string;
}

export class ResponseTransactionDB {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountExternalIdDebit: string;

  @ApiProperty()
  accountExternalIdCredit: string;

  @ApiProperty()
  tranferTypeId: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;
}

class Name {
  @ApiProperty()
  name: string;
}

export class ResponseTransaction {
  @ApiProperty()
  transactionExternalId: string;

  @ApiProperty({ type: Name })
  transactionType: Name;

  @ApiProperty({ type: Name })
  transactionStatus: Name;

  @ApiProperty()
  value: number;

  @ApiProperty()
  createdAt: Date;
}

export class saveTransactionResponse extends OmitType(ResponseTransaction, [
  'transactionType',
  'transactionStatus',
] as const) {
  @ApiProperty({ type: { Name } })
  transactionType: Name;

  @ApiProperty({ type: { Name } })
  transactionStatus: Name;
}
