import { Injectable } from '@nestjs/common';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    const { riderId, ...locationData } = createLocationDto;
    return this.prisma.location.create({
      data: {
        ...locationData,
        Rider: {
          connect: { id: riderId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findOne(id: number) {
    return this.prisma.location.findUnique({
      where: { id },
    });
  }

  findByRiderId(riderId: number) {
    return this.prisma.location.findMany({
      where: {
        riderId,
        // createdAt: {
        //   gte: new Date(Date.now() - 1000 * 60 * 60 * 24),
        // },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  remove(id: number) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
