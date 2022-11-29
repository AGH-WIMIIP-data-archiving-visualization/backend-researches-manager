import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SingleRead } from './single-read.dto';

export class ConductLabjackResearchDto {
  @IsNotEmpty()
  @ApiProperty()
  scalingFunction: string;

  @IsNotEmpty()
  @ApiProperty()
  unit: string;

  @IsNotEmpty()
  @ApiProperty()
  deviceName: string;

  @IsNotEmpty()
  @ApiProperty()
  data: SingleRead[];
}
