import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the rider',
    example: 1,
    type: Number,
  })
  riderId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The latitude of the location',
    example: 1,
    type: Number,
  })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The longitude of the location',
    example: 1,
    type: Number,
  })
  longitude: number;
}
