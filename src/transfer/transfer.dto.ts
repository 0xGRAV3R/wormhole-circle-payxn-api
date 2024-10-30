import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({ description: 'The wallet address of the sender' })
  @IsString()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty({ description: 'The amount of USDC to transfer' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
