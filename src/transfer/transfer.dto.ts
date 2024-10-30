// src/transfer/transfer.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  wallet: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
