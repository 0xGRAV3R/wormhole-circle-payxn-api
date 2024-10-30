import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { TransferDto } from './transfer.dto';
import { Wormhole } from '@wormhole-foundation/sdk';

@Injectable()
export class TransferService {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  }

  async transferUSDCToSolana(transferDto: TransferDto): Promise<string> {
    try {
      const usdcContract = new ethers.Contract(
        process.env.USDC_CONTRACT_ADDRESS,
        [
          'function approve(address spender, uint256 amount)',
          'function transferFrom(address sender, address recipient, uint256 amount)',
        ],
        this.wallet
      );

      const amountInUnits = ethers.utils.parseUnits(transferDto.amount.toString(), 6);
      const approveTx = await usdcContract.approve(process.env.WORMHOLE_CONTRACT_ADDRESS, amountInUnits);
      await approveTx.wait();

      const wormhole = new Wormhole({
        environment: 'mainnet',
      });

      const transferId = await wormhole.completeTransfer({
        sourceChain: 'ethereum',
        targetChain: 'solana',
        from: transferDto.wallet,
        to: process.env.SOLANA_RECEIVER_ADDRESS,
        amount: amountInUnits,
      });

      return transferId; // Return transaction ID
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }
}
