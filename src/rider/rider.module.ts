import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationService } from 'src/location/location.service';
@Module({
  imports: [PrismaModule],
  controllers: [RiderController],
  providers: [RiderService, LocationService],
})
export class RiderModule {}
