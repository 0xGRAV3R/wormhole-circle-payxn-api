import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  get infuraProjectId(): string {
    return process.env.INFURA_PROJECT_ID;
  }

  get privateKey(): string {
    return process.env.PRIVATE_KEY;
  }

  get usdcContractAddress(): string {
    return process.env.USDC_CONTRACT_ADDRESS;
  }

  get wormholeContractAddress(): string {
    return process.env.WORMHOLE_CONTRACT_ADDRESS;
  }

  get solanaReceiverAddress(): string {
    return process.env.SOLANA_RECEIVER_ADDRESS;
  }

  get ethProviderUrl(): string {
    return `https://mainnet.infura.io/v3/${this.infuraProjectId}`;
  }
}
