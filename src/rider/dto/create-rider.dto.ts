import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
export class CreateRiderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name of the rider',
    example: 'John',
    type: String,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name of the rider',
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the rider',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The license plate of the rider',
    example: 'ABC123',
    type: String,
  })
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('TH')
  @ApiProperty({
    description: 'The phone number of the rider',
    example: '0812345678',
    type: String,
  })
  phoneNumber: string;
}
