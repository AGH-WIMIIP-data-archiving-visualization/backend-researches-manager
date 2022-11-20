import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SingleRead } from './single-read.dto';

export class ConductLabjackResearchDto {
  @IsNotEmpty()
  @ApiProperty()
  deviceName: string;

  @IsNotEmpty()
  @ApiProperty()
  data: SingleRead[];
}
