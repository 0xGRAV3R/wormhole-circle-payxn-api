import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment/payment.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PaymentModule,
  ],
})
export class AppModule {}