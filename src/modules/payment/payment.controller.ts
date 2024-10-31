import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Initiate cross-chain USDC transfer' })
  @ApiResponse({ status: 201, type: PaymentResponseDto })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get(':transferId')
  @ApiOperation({ summary: 'Get payment status' })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async getPaymentStatus(@Param('transferId') transferId: string) {
    return this.paymentService.getPaymentStatus(transferId);
  }
}