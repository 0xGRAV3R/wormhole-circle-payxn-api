import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
