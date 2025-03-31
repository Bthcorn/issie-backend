import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateLocationDto extends PartialType(
  OmitType(CreateLocationDto, ['riderId'] as const),
) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The latitude of the location',
    example: 1,
    type: Number,
  })
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The longitude of the location',
    example: 1,
    type: Number,
  })
  longitude?: number;
}
