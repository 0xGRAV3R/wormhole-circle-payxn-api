import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  @IsString()
  wallet: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
