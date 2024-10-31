import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChainId,
  CHAIN_ID_ETH,
  CHAIN_ID_SOLANA,
  transferFromEth,
  parseSequenceFromLogEth,
  getEmitterAddressEth,
} from '@wormhole-foundation/sdk';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ethers } from 'ethers';

@Injectable()
export class PaymentService {
  constructor(private configService: ConfigService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const provider = new ethers.providers.JsonRpcProvider(
      this.configService.get('ethereum.rpc')
    );

    const bridgeAddress = this.configService.get('wormhole.bridge');
    const receiverAddress = this.configService.get('solana.receiverAddress');

    // Initialize transfer using Wormhole SDK
    const transfer = await transferFromEth(
      provider,
      bridgeAddress,
      createPaymentDto.amount,
      this.configService.get('ethereum.usdcAddress'),
      CHAIN_ID_SOLANA,
      receiverAddress
    );

    // Get transfer details
    const sequence = parseSequenceFromLogEth(transfer.logs);
    const emitterAddress = getEmitterAddressEth(bridgeAddress);

    return {
      transactionHash: transfer.transactionHash,
      status: 'pending',
      transferId: `${CHAIN_ID_ETH}-${emitterAddress}-${sequence}`,
    };
  }

  async getPaymentStatus(transferId: string) {
    // Implementation to check transfer status
    // You would typically query Wormhole's VAA (Verified Action Approval)
    return {
      transactionHash: '',
      status: 'completed',
      transferId,
    };
  }
}