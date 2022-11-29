import { Repository } from 'typeorm';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleResearch } from './single-research.entity';
import { v4 as uuid } from 'uuid';
import { UserPayload } from 'src/authorization/authorization.decorator';

export interface SingleResearchRepository extends Repository<SingleResearch> {
  createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
    user: UserPayload,
  ): Promise<SingleResearch>;
}

export const customSingleResearchRepositoryMethods: Pick<
  SingleResearchRepository,
  'createSingleResearch'
> = {
  async createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
    user: UserPayload,
  ): Promise<SingleResearch> {
    const { isPublic, singleResearchName } = createSingleResearch;

    const singleResearch = this.create({
      id: uuid(),
      authUserId: user.sub,
      isPublic: isPublic,
      singleResearchName: singleResearchName,
    });

    await this.save(singleResearch);
    return singleResearch;
  },
};
