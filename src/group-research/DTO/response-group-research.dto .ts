import { SingleResearch } from 'src/single-research/single-research.entity';
import { ObjectID } from 'typeorm';

export class GroupResearchResponseDto {
  _id: ObjectID;

  id: string;

  groupResearchName: string;

  description: string;

  isPublic: boolean;

  createdAt!: Date;

  updatedAt!: Date;

  singleResearches: SingleResearch[];
}
