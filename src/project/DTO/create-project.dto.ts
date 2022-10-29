import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  projectName: string;
}
