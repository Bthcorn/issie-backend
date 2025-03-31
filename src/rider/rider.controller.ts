import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { LocationService } from 'src/location/location.service';
import { CreateRiderLocationDto } from './dto/create-rider-location.dto';
import { DISTANCE } from './constants/constant';

@Controller('riders')
export class RiderController {
  constructor(
    private readonly riderService: RiderService,
    private readonly locationService: LocationService,
  ) {}

  @Post()
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.riderService.create(createRiderDto);
  }

  @Get()
  findAll() {
    return this.riderService.findAll();
  }

  @Get('search')
  search(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.riderService.search(latitude, longitude, DISTANCE);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riderService.findOne(+id);
  }

  @Get(':riderId/locations')
  getLocations(@Param('riderId') riderId: string) {
    const rider = this.riderService.findOne(+riderId);

    if (!rider) {
      throw new NotFoundException('Rider not found');
    }

    return this.locationService.findByRiderId(+riderId);
  }

  @Post(':riderId/locations')
  async createLocation(
    @Param('riderId') riderId: string,
    @Body() createRiderLocationDto: CreateRiderLocationDto,
  ) {
    const rider = await this.riderService.findOne(+riderId);

    if (!rider) {
      throw new NotFoundException('Rider not found');
    }

    return this.locationService.create({
      ...createRiderLocationDto,
      riderId: +riderId,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.riderService.update(+id, updateRiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riderService.remove(+id);
  }
}
