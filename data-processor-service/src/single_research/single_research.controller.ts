import { Body, Controller, Post } from '@nestjs/common';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleResearch } from './single_research.entity';
import { SingleResearchService } from './single_research.service';

@Controller('single-research')
export class SingleResearchController {
  constructor(private singleResearchService: SingleResearchService) {}

  @Post()
  CreateSingleResearch(
    @Body() createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch> {
    return this.singleResearchService.createSingleResearch(
      createSingleResearch,
    );
  }
}
