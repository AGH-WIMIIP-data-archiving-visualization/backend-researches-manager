import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import {
  GetUser,
  UserPayload,
} from 'src/authorization/authorization.decorator';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearchResponseDto } from './DTO/response-group-research.dto ';
import { GroupResearch } from './group-research.entity';
import { GroupResearchService } from './group_research.service';

@UseGuards(AuthGuard('jwt'))
@Controller('group-research')
export class GroupResearchController {
  constructor(private groupResearchService: GroupResearchService) {}

  @Post()
  createGroupeResearch(
    @Body() createGroupResearch: CreateGroupResearchkDto,
    @GetUser() user: UserPayload,
  ): Promise<GroupResearch> {
    return this.groupResearchService.createGroupResearch(
      createGroupResearch,
      user,
    );
  }

  @ApiCreatedResponse({
    isArray: true,
    type: GroupResearchResponseDto,
  })
  @Get()
  getAllGroupResearches(
    @GetUser() user: UserPayload,
  ): Promise<GroupResearchResponseDto[]> {
    return this.groupResearchService.getAllGroupResearches(user);
  }

  @ApiCreatedResponse({
    type: GroupResearchResponseDto,
  })
  @Get('/:id')
  getGroupResearchById(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<GroupResearchResponseDto> {
    return this.groupResearchService.getGroupResearchById(id, user);
  }

  @Patch('/:groupID/single-research/:singleID')
  insertSingleResearchToGroup(
    @Param('groupID') groupID: string,
    @Param('singleID') singleID: string,
    @GetUser() user: UserPayload,
  ): Promise<GroupResearch> {
    return this.groupResearchService.insertSingleResearchToGroup(
      groupID,
      singleID,
      user,
    );
  }

  @Delete('/:id')
  deleteGroupById(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<void> {
    return this.groupResearchService.deleteGroupById(id, user);
  }
}
