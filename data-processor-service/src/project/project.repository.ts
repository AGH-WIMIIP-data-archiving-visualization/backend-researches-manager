import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProjectDto } from './DTO/create-project.dto';
import { Project } from './project.entity';

export interface ProjectRepository extends Repository<Project> {
  createProject(createProject: CreateProjectDto): Promise<Project>;
}

export const customProjectRepositoryMethods: Pick<
  ProjectRepository,
  'createProject'
> = {
  async createProject(createProjectData: CreateProjectDto): Promise<Project> {
    const { description, projectName, isPublic } = createProjectData;

    const project = this.create({
      id: uuid(),
      description: description,
      projectName: projectName,
      isPublic: isPublic,
    });

    await this.save(project);
    return project;
  },
};
