import { ApiProperty } from '@nestjs/swagger';

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
