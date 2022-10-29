import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/authorization/authorization.decorator';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { GroupResearchRepository } from 'src/group-research/group-research.repository';
import { Project } from 'src/project/project.entity';
import { ProjectRepository } from 'src/project/project.repository';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleRead } from './DTO/single-read.dto';
import { SingleResearch } from './single-research.entity';
import { SingleResearchRepository } from './single-research.repository';
@Injectable()
export class SingleResearchService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: ProjectRepository,

    @InjectRepository(GroupResearch)
    private groupResearchRepository: GroupResearchRepository,

    @InjectRepository(SingleResearch)
    private singleResearchRepository: SingleResearchRepository,
  ) {}

  async createSingleResearch(
    createSingleResearch: CreateSingleResearchkDto,
    user: UserPayload,
  ): Promise<SingleResearch> {
    return this.singleResearchRepository.createSingleResearch(
      createSingleResearch,
      user,
    );
  }

  async getAllSingleResearches(user: UserPayload): Promise<SingleResearch[]> {
    const group = (
      await this.groupResearchRepository.find({
        where: { authUserId: user.sub },
      })
    ).map((e) => e.singleResearchesIds);

    const project = (
      await this.projectRepository.find({
        where: { authUserId: user.sub },
      })
    ).map((e) => e.singleResearchesIds);

    const usedSingleResearches = group.concat(project).flat(1);

    return this.singleResearchRepository
      .find({
        where: { authUserId: user.sub },
      })
      .then((result) =>
        result.filter((e) => !usedSingleResearches.includes(e.id)),
      );
  }

  async getSingleResearchById(
    id: string,
    user: UserPayload,
  ): Promise<SingleResearch> {
    const found = await this.singleResearchRepository.findOne({
      where: { id: id, authUserId: user.sub },
    });
    if (!found) {
      throw new NotFoundException(`Research with ${id} id does not extist`);
    }
    return found;
  }

  async conductLabjackResearch(
    id: string,
    data: SingleRead[],
    user: UserPayload,
  ): Promise<SingleResearch> {
    const research = await this.getSingleResearchById(id, user);

    research.data = data['data'];
    await this.singleResearchRepository.save(research);
    return research;
  }
}
