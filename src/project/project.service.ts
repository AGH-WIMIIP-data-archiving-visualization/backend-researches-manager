import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/authorization/authorization.decorator';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { GroupResearchRepository } from 'src/group-research/group-research.repository';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { SingleResearchRepository } from 'src/single-research/single-research.repository';
import { projectToProjectResponseDto } from './Builder/projectToProjectsResponse.dto';
import { CreateProjectDto } from './DTO/create-project.dto';
import { ProjectResponseDto } from './DTO/response-project.dto';
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

  async createProject(
    createProject: CreateProjectDto,
    user: UserPayload,
  ): Promise<Project> {
    return this.projectRepository.createProject(createProject, user);
  }

  async getAllProjects(user: UserPayload): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: { authUserId: user.sub },
    });
    return projects;
  }

  async getProjectId(
    id: string,
    user: UserPayload,
  ): Promise<ProjectResponseDto> {
    const projects = await this.projectRepository.findOne({
      where: { id: id, authUserId: user.sub },
    });

    const groupResearches = await this.groupResearchRepository.find({
      where: { authUserId: user.sub },
    });
    const singleResearches = await this.singleResearchRepository.find({
      where: { authUserId: user.sub },
    });

    if (!projects) {
      throw new NotFoundException(`Project with ${id} id does not extist`);
    }
    return projectToProjectResponseDto(
      projects,
      groupResearches,
      singleResearches,
    );
  }

  async insertSingleResearchToProject(
    projectID: string,
    singleID: string,
    user: UserPayload,
  ): Promise<Project> {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id: projectID, authUserId: user.sub },
      });
      const singleResearch = await this.singleResearchRepository.findOneOrFail({
        where: { id: singleID, authUserId: user.sub },
      });

      if (project.singleResearchesIds) {
        if (!project.singleResearchesIds.includes(singleResearch.id)) {
          project.singleResearchesIds = [
            ...project.singleResearchesIds,
            singleResearch.id,
          ];
        }
      } else {
        project.singleResearchesIds = [singleResearch.id];
      }

      await this.projectRepository.save(project);
      return project;
    } catch (e) {
      throw new NotFoundException(`Group or Single research  does not extist`);
    }
  }

  async insertGroupResearchToProject(
    projectID: string,
    groupID: string,
    user: UserPayload,
  ): Promise<Project> {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id: projectID, authUserId: user.sub },
      });
      const groupResearch = await this.groupResearchRepository.findOneOrFail({
        where: { id: groupID, authUserId: user.sub },
      });

      if (project.groupsResearchIds) {
        if (!project.groupsResearchIds.includes(groupResearch.id)) {
          project.groupsResearchIds = [
            ...project.groupsResearchIds,
            groupResearch.id,
          ];
        }
      } else {
        project.groupsResearchIds = [groupResearch.id];
      }

      await this.projectRepository.save(project);
      return project;
    } catch (e) {
      throw new NotFoundException(`Group or Single research  does not extist`);
    }
  }

  async deleteProjectById(id: string, user: UserPayload): Promise<void> {
    const project = await this.getProjectId(id, user);

    project.singleResearches.forEach(async (e) => {
      await this.singleResearchRepository.delete({
        authUserId: user.sub,
        id: e.id,
      });
    });

    project.groupsResearch.forEach(async (e) => {
      await this.groupResearchRepository.delete({
        authUserId: user.sub,
        id: e.id,
      });
    });

    const result = await this.projectRepository.delete({
      authUserId: user.sub,
      id: id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Project with Id ${id} not found `);
    }
  }
}
