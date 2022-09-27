import { Repository } from 'typeorm';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleResearch } from './single_research.entity';

export interface SingleResearchRepository extends Repository<SingleResearch> {
  createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch>;
}

export const customSingleResearchRepositoryMethods: Pick<
  SingleResearchRepository,
  'createSingleResearch'
> = {
  async createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch> {
    const { deviceName, isPublic, singleResearchName } = createSingleResearch;

    const singleResearch = this.create({
      deviceName: deviceName,
      isPublic: isPublic,
      singleResearchName: singleResearchName,
    });

    await this.save(singleResearch);
    return singleResearch;
  },
};
