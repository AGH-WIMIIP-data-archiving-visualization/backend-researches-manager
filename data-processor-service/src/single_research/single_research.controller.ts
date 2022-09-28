import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleRead } from './DTO/single_read.dto';
import { SingleResearch } from './single_research.entity';
import { SingleResearchService } from './single_research.service';

@Controller('single-research')
export class SingleResearchController {
  constructor(private singleResearchService: SingleResearchService) {}

  @Get()
  getAllSingleResearches(): Promise<SingleResearch[]> {
    return this.singleResearchService.getAllSingleResearches();
  }

  @Get('/:id')
  getSingleResearchById(@Param('id') id: string): Promise<SingleResearch> {
    return this.singleResearchService.getSingleResearchById(id);
  }

  @Post()
  createSingleResearch(
    @Body() createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch> {
    return this.singleResearchService.createSingleResearch(
      createSingleResearch,
    );
  }

  @Patch('/:id/data')
  insertDataToSingleResearch(
    @Param('id') id: string,
    @Body() data: SingleRead[],
  ): Promise<SingleResearch> {
    return this.singleResearchService.insertDataToSingleResearch(id, data);
  }
}
