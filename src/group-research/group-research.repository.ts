import { Repository } from 'typeorm';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearch } from './group-research.entity';
import { v4 as uuid } from 'uuid';
import { UserPayload } from 'src/authorization/authorization.decorator';

export interface GroupResearchRepository extends Repository<GroupResearch> {
  createGroupResearch(
    createGrupupResearch: CreateGroupResearchkDto,
    user: UserPayload,
  ): Promise<GroupResearch>;
}

export const customGroupResearchRepositoryMethods: Pick<
  GroupResearchRepository,
  'createGroupResearch'
> = {
  async createGroupResearch(
    createSingleResearch: CreateGroupResearchkDto,
    user: UserPayload,
  ): Promise<GroupResearch> {
    const { description, groupResearchName, isPublic } = createSingleResearch;

    const groupResearch = this.create({
      id: uuid(),
      description: description,
      authUserId: user.sub,
      groupResearchName: groupResearchName,
      isPublic: isPublic,
    });

    await this.save(groupResearch);
    return groupResearch;
  },
};
