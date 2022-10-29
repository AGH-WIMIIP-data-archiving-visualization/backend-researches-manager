import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateGroupResearchkDto {
  @IsNotEmpty()
  groupResearchName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
