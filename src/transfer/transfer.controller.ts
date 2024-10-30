import { Controller, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async transfer(@Body() transferDto: TransferDto): Promise<string> {
    return this.transferService.transferUSDCToSolana(transferDto);
  }
}
