import { UserPayload } from 'src/authorization/authorization.decorator';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProjectDto } from './DTO/create-project.dto';
import { Project } from './project.entity';

export interface ProjectRepository extends Repository<Project> {
  createProject(
    createProject: CreateProjectDto,
    user: UserPayload,
  ): Promise<Project>;
}

export const customProjectRepositoryMethods: Pick<
  ProjectRepository,
  'createProject'
> = {
  async createProject(
    createProjectData: CreateProjectDto,
    user: UserPayload,
  ): Promise<Project> {
    const { description, projectName, isPublic } = createProjectData;

    const project = this.create({
      id: uuid(),
      description: description,
      projectName: projectName,
      authUserId: user.sub,
      isPublic: isPublic,
    });

    await this.save(project);
    return project;
  },
};
