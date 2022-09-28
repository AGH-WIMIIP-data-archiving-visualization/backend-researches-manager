import { Repository } from 'typeorm';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleResearch } from './single-research.entity';
import { v4 as uuid } from 'uuid';

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
      id: uuid(),
      deviceName: deviceName,
      isPublic: isPublic,
      singleResearchName: singleResearchName,
    });

    await this.save(singleResearch);
    return singleResearch;
  },
};