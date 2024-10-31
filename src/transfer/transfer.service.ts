import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { TransferDto } from './transfer.dto';
import { Wormhole } from '@wormhole-foundation/sdk';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables


@Injectable()
export class TransferService {
  private provider: ethers.JsonRpcProvider; // Adjust the provider type
  private wallet: ethers.Wallet;
  

  constructor() {
    // Ensure you have the correct environment variable for Infura
    this.provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  }

  async transferUSDCToSolana(transferDto: TransferDto): Promise<string> {
    try {
      // Ensure you have the correct contract address
      const usdcContract = new ethers.Contract(
        process.env.USDC_CONTRACT_ADDRESS,
        [
          'function approve(address spender, uint256 amount)',
          'function transferFrom(address sender, address recipient, uint256 amount)',
        ],
        this.wallet
      );

      // Parse the amount with 6 decimals for USDC
      const amountInUnits = ethers.utils.parseUnits(transferDto.amount.toString(), 6);
      
      // Approve the Wormhole contract to spend USDC
      const approveTx = await usdcContract.approve(process.env.WORMHOLE_CONTRACT_ADDRESS, amountInUnits);
      await approveTx.wait(); // Wait for the approval transaction to be mined

      // Using the Wormhole SDK directly to complete the transfer
      const transferId = await completeTransfer({
        from: transferDto.wallet, // This should be the sender's wallet address
        to: process.env.SOLANA_RECEIVER_ADDRESS, // The constant defined address
        amount: amountInUnits,
        sourceChain: 'ethereum',
        targetChain: 'solana',
        environment: 'mainnet',
        wallet: this.wallet // The wallet to sign the transaction
      });

      return transferId; // Return transaction ID
    } catch (error) {
      console.error(`Transfer failed: ${error.message}`); // Log error for debugging
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }
}
