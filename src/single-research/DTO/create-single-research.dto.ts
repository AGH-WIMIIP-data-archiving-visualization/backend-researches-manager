import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSingleResearchkDto {
  @IsNotEmpty()
  @ApiProperty()
  deviceName: string;

  @IsNotEmpty()
  @ApiProperty()
  singleResearchName: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;
}
