import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './DTO/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import {
  GetUser,
  UserPayload,
} from 'src/authorization/authorization.decorator';

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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllProjects(@GetUser() user: UserPayload): Promise<Project[]> {
    return this.projectService.getAllProjects(user);
  }
}
