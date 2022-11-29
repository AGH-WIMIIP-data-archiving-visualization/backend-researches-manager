import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  deviceName: string;

  @ApiProperty()
  @IsNotEmpty()
  scalingFunction: string;

  @ApiProperty()
  @IsNotEmpty()
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  deviceInput: number;
}
