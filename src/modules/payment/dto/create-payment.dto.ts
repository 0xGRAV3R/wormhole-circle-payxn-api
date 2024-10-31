import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Amount of USDC to transfer',
    example: '100.00',
  })
  amount: string;

  @ApiProperty({
    description: 'Ethereum wallet address of the sender',
    example: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  })
  senderAddress: string;
}