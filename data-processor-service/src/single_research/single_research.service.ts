import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleRead } from './DTO/single_read.dto';
import { SingleResearch } from './single_research.entity';
import { SingleResearchRepository } from './single_research.repository';
@Injectable()
export class SingleResearchService {
  constructor(
    @InjectRepository(SingleResearch)
    private singleResearchRepository: SingleResearchRepository,
  ) {}

  async createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch> {
    return this.singleResearchRepository.createSingleResearch(
      createSingleResearch,
    );
  }

  async getAllSingleResearches(): Promise<SingleResearch[]> {
    return this.singleResearchRepository.find();
  }

  async getSingleResearchById(id: string): Promise<SingleResearch> {
    const found = await this.singleResearchRepository.findOne({
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(`Research with ${id} id does not extist`);
    }
    return found;
  }

  async insertDataToSingleResearch(
    id: string,
    data: SingleRead[],
  ): Promise<SingleResearch> {
    const research = await this.getSingleResearchById(id);

    research.data = data['data'];
    await this.singleResearchRepository.save(research);
    return research;
  }
}
