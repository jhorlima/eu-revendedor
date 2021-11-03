import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { ResellerModule } from './reseller/reseller.module';
import { CashbackModule } from './cashback/cashback.module';

@Module({
  imports: [
    AuthModule,
    OrderModule,
    ResellerModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    ),
    CashbackModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
