import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderedModule } from './ordered/ordered.module';
import { ResellerModule } from './reseller/reseller.module';

@Module({
  imports: [
    AuthModule,
    OrderedModule,
    ResellerModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
