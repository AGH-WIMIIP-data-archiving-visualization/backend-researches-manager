import { ApiProperty } from '@nestjs/swagger';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { ObjectID } from 'typeorm';

export class ProjectResponseDto {
  _id: ObjectID;
  @ApiProperty()
  id: string;
  @ApiProperty()
  projectName: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isPublic: boolean;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
  @ApiProperty({ isArray: true, type: GroupResearch })
  groupsResearch: GroupResearch[];
  @ApiProperty({ isArray: true, type: SingleResearch })
  singleResearches: SingleResearch[];
}
