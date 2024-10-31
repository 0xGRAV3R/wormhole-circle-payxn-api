import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty()
  transactionHash: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  transferId: string;
}
