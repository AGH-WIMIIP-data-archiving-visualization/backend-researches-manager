import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './DTO/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import {
  GetUser,
  UserPayload,
} from 'src/authorization/authorization.decorator';
import { ProjectResponseDto } from './DTO/response-project.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createSingleResearch(
    @Body() createProject: CreateProjectDto,
    @GetUser() user: UserPayload,
  ): Promise<Project> {
    return this.projectService.createProject(createProject, user);
  }

  @ApiCreatedResponse({
    isArray: true,
    type: Project,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllProjects(@GetUser() user: UserPayload): Promise<Project[]> {
    return this.projectService.getAllProjects(user);
  }

  @ApiCreatedResponse({
    type: ProjectResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getProjectId(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<ProjectResponseDto> {
    return this.projectService.getProjectId(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:projectID/single-research/:singleID')
  insertSingleResearchToProject(
    @Param('projectID') projectID: string,
    @Param('singleID') singleID: string,
    @GetUser() user: UserPayload,
  ): Promise<Project> {
    return this.projectService.insertSingleResearchToProject(
      projectID,
      singleID,
      user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:projectID/group-research/:groupID')
  insertGroupResearchToProject(
    @Param('projectID') projectID: string,
    @Param('groupID') groupID: string,
    @GetUser() user: UserPayload,
  ): Promise<Project> {
    return this.projectService.insertGroupResearchToProject(
      projectID,
      groupID,
      user,
    );
  }
}
