import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleResearchService } from 'src/single-research/single-research.service';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearch } from './group-research.entity';
import { GroupResearchRepository } from './group-research.repository';

@Injectable()
export class GroupResearchService {
  constructor(
    @InjectRepository(GroupResearch)
    private groupResearchRepository: GroupResearchRepository,
    private singleResearchService: SingleResearchService,
  ) {}

  async createGroupResearch(
    createGrupupResearch: CreateGroupResearchkDto,
  ): Promise<GroupResearch> {
    return this.groupResearchRepository.createGroupResearch(
      createGrupupResearch,
    );
  }
  async getAllGroupResearches(): Promise<GroupResearch[]> {
    return this.groupResearchRepository.find();
  }

  async getGroupResearchById(id: string): Promise<GroupResearch> {
    const found = await this.groupResearchRepository.findOne({
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(
        `Group of researches with ${id} id does not extist`,
      );
    }
    return found;
  }

  async insertSingleResearchToGroup(
    groupID: string,
    singleID: string,
  ): Promise<GroupResearch> {
    try {
      const researchGroup = await this.getGroupResearchById(groupID);
      const singleResearch =
        await this.singleResearchService.getSingleResearchById(singleID);

      if (researchGroup.singleResearchesIds) {
        if (!researchGroup.singleResearchesIds.includes(singleResearch.id)) {
          researchGroup.singleResearchesIds = [
            ...researchGroup.singleResearchesIds,
            singleResearch.id,
          ];
        }
      } else {
        researchGroup.singleResearchesIds = [singleResearch.id];
      }

      await this.groupResearchRepository.save(researchGroup);
      return researchGroup;
    } catch (e) {
      throw new NotFoundException(`Group or Single research  does not extist`);
    }
  }
}
