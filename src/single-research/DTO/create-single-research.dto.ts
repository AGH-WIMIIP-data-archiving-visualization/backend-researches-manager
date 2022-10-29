import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSingleResearchkDto {
  @IsNotEmpty()
  deviceName: string;

  @IsNotEmpty()
  singleResearchName: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
