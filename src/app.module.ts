// src/app.module.ts
import { Module } from '@nestjs/common';
import { TransferController } from './transfer/transfer.controller';
import { TransferService } from './transfer/transfer.service';

@Module({
  imports: [],
  controllers: [TransferController],
  providers: [TransferService],
})
export class AppModule {}
