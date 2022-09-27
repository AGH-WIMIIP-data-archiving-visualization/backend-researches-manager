import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
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
}
