import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { ObjectID } from 'typeorm';

export class ProjectResponseDto {
  _id: ObjectID;

  id: string;

  projectName: string;

  description: string;

  isPublic: boolean;

  createdAt!: Date;

  updatedAt!: Date;

  groupsResearch: GroupResearch[];

  singleResearches: SingleResearch[];
}
