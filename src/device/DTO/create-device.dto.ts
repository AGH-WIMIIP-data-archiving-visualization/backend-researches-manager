import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  deviceName: string;
  @IsNotEmpty()
  scalingFunction: string;
  @IsNotEmpty()
  unit: string;
  @IsNotEmpty()
  @IsInt()
  deviceInput: number;
}
