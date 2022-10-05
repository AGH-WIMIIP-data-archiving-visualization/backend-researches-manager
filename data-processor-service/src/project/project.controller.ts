import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './DTO/create-project.dto';
import { ProjectResponseDto } from './DTO/response-project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createSingleResearch(
    @Body() createProject: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(createProject);
  }

  @Get()
  getAllProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }
}
