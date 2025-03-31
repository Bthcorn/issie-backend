import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { getDistance } from './utils/get-distance';

@Injectable()
export class RiderService {
  constructor(private prisma: PrismaService) {}

  create(createRiderDto: CreateRiderDto) {
    const rider = this.prisma.rider.create({
      data: createRiderDto,
    });
    return rider;
  }

  findAll() {
    return this.prisma.rider.findMany({
      include: {
        locations: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  findOne(id: number) {
    console.log(id);
    console.log(typeof id);
    console.log('find one is called');
    return this.prisma.rider.findUnique({
      where: {
        id: id,
      },
      include: {
        locations: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  async search(latitude: number, longitude: number, distance: number) {
    console.log(latitude, longitude, distance);

    const riders = await this.findAll();

    console.log(riders);

    const ridersWithDistance = riders
      .filter((rider) => rider.locations.length > 0) // Only include riders with locations
      .map((rider) => {
        const location = rider.locations[0]; // Get the latest location
        return {
          ...rider,
          distance: getDistance(
            latitude,
            longitude,
            location.latitude,
            location.longitude,
          ),
        };
      });

    return ridersWithDistance.filter((rider) => rider.distance <= distance);
  }

  update(id: number, updateRiderDto: UpdateRiderDto) {
    return this.prisma.rider.update({
      where: { id },
      data: updateRiderDto,
    });
  }

  remove(id: number) {
    return this.prisma.rider.delete({
      where: { id },
    });
  }
}
