import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;

  @IsNotEmpty()
  @ApiProperty()
  projectName: string;
}
