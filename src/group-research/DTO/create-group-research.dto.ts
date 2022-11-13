import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateGroupResearchkDto {
  @IsNotEmpty()
  @ApiProperty()
  groupResearchName: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;
}
