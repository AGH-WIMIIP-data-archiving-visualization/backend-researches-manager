import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { GroupResearchRepository } from 'src/group-research/group-research.repository';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { SingleResearchRepository } from 'src/single-research/single-research.repository';
import { CreateProjectDto } from './DTO/create-project.dto';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: ProjectRepository,

    @InjectRepository(GroupResearch)
    private groupResearchRepository: GroupResearchRepository,

    @InjectRepository(SingleResearch)
    private singleResearchRepository: SingleResearchRepository,
  ) {}

  async createProject(createProject: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProject);
  }

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
}
