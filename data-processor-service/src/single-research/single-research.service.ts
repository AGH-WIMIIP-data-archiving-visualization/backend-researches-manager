import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/authorization/authorization.decorator';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleRead } from './DTO/single_read.dto';
import { SingleResearch } from './single-research.entity';
import { SingleResearchRepository } from './single-research.repository';
@Injectable()
export class SingleResearchService {
  constructor(
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
    return this.singleResearchRepository.find({
      where: { authUserId: user.sub },
    });
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

  async insertDataToSingleResearch(
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
