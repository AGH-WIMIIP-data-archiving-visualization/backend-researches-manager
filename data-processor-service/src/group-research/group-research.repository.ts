import { Repository } from 'typeorm';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearch } from './group-research.entity';
import { v4 as uuid } from 'uuid';

export interface GroupResearchRepository extends Repository<GroupResearch> {
  createGroupResearch(
    createGrupupResearch: CreateGroupResearchkDto,
  ): Promise<GroupResearch>;
}

export const customGroupResearchRepositoryMethods: Pick<
  GroupResearchRepository,
  'createGroupResearch'
> = {
  async createGroupResearch(
    createSingleResearch: CreateGroupResearchkDto,
  ): Promise<GroupResearch> {
    const { description, groupResearchName, isPublic } = createSingleResearch;

    const groupResearch = this.create({
      id: uuid(),
      description: description,
      groupResearchName: groupResearchName,
      isPublic: isPublic,
    });

    await this.save(groupResearch);
    return groupResearch;
  },
};
