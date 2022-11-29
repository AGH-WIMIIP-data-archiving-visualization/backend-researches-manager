import { ApiProperty } from '@nestjs/swagger';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { ObjectID } from 'typeorm';

export class GroupResearchResponseDto {
  _id: ObjectID;

  @ApiProperty()
  id: string;

  @ApiProperty()
  groupResearchName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ isArray: true, type: SingleResearch })
  singleResearches: SingleResearch[];
}
