// src/transfer/transfer.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TransferService } from './transfer.service';
import { TransferDto } from './transfer.dto';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @ApiBody({ type: TransferDto })
  @ApiResponse({ status: 201, description: 'Transfer initiated successfully' })
  @ApiResponse({ status: 400, description: 'Transfer initiation failed' })
  async initiateTransfer(@Body() transferDto: TransferDto) {
    try {
      const transactionId = await this.transferService.transferUSDCToSolana(transferDto);
      return { transactionId };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
