import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiderModule } from './rider/rider.module';
import { LocationModule } from './location/location.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [RiderModule, LocationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
