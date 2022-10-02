import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearch } from './group-research.entity';
import { GroupResearchService } from './group_research.service';

@Controller('group-research')
export class GroupResearchController {
  constructor(private groupResearchService: GroupResearchService) {}

  @Post()
  createGroupeResearch(
    @Body() createGroupResearch: CreateGroupResearchkDto,
  ): Promise<GroupResearch> {
    return this.groupResearchService.createGroupResearch(createGroupResearch);
  }

  @Get()
  getAllGroupResearches(): Promise<GroupResearch[]> {
    return this.groupResearchService.getAllGroupResearches();
  }

  @Get('/:id')
  getSingleResearchById(@Param('id') id: string): Promise<GroupResearch> {
    return this.groupResearchService.getGroupResearchById(id);
  }

  @Patch('/:groupID/single-research/:singleID')
  insertSingleResearchToGroup(
    @Param('groupID') groupID: string,
    @Param('singleID') singleID: string,
  ): Promise<GroupResearch> {
    return this.groupResearchService.insertSingleResearchToGroup(
      groupID,
      singleID,
    );
  }
}
