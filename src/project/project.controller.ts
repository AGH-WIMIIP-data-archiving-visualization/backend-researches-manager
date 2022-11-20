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
@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

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
  @Get()
  getAllProjects(@GetUser() user: UserPayload): Promise<Project[]> {
    return this.projectService.getAllProjects(user);
  }

  @ApiCreatedResponse({
    type: ProjectResponseDto,
  })
  @Get('/:id')
  getProjectId(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<ProjectResponseDto> {
    return this.projectService.getProjectId(id, user);
  }

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

  @Delete('/:id')
  deleteDeviceByID(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<void> {
    return this.projectService.deleteProjectById(id, user);
  }
}
