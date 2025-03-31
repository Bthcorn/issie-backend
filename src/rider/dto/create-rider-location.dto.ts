import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRiderLocationDto {
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
