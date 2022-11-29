import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProjectsFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  publicOnly?: boolean;
}
