import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/authorization/authorization.decorator';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { SingleResearchRepository } from 'src/single-research/single-research.repository';
import { groupsResearchToGroupsResearchResponseDto } from './Builder/researchGroupsToResearchGroups.dto';
import { groupResearchToGroupResearchResponseDto } from './Builder/researchGroupToResearchGroup.dto';
import { CreateGroupResearchkDto } from './DTO/create-group-research.dto';
import { GroupResearchResponseDto } from './DTO/response-group-research.dto ';
import { GroupResearch } from './group-research.entity';
import { GroupResearchRepository } from './group-research.repository';

@Injectable()
export class GroupResearchService {
  constructor(
    @InjectRepository(GroupResearch)
    private groupResearchRepository: GroupResearchRepository,

    @InjectRepository(SingleResearch)
    private singleResearchRepository: SingleResearchRepository,
  ) {}

  async createGroupResearch(
    createGrupupResearch: CreateGroupResearchkDto,
    user: UserPayload,
  ): Promise<GroupResearch> {
    return this.groupResearchRepository.createGroupResearch(
      createGrupupResearch,
      user,
    );
  }
  async getAllGroupResearches(
    user: UserPayload,
  ): Promise<GroupResearchResponseDto[]> {
    const groupResearches = await this.groupResearchRepository.find({
      where: { authUserId: user.sub },
    });
    const singleResearches = await this.singleResearchRepository.find({
      where: { authUserId: user.sub },
    });

    return groupsResearchToGroupsResearchResponseDto(
      groupResearches,
      singleResearches,
    );
  }

  async getGroupResearchById(
    id: string,
    user: UserPayload,
  ): Promise<GroupResearchResponseDto> {
    const found = await this.groupResearchRepository.findOne({
      where: { id: id, authUserId: user.sub },
    });
    const singleResearches = await this.singleResearchRepository.find({
      where: { authUserId: user.sub },
    });

    if (!found) {
      throw new NotFoundException(
        `Group of researches with ${id} id does not extist`,
      );
    }
    return groupResearchToGroupResearchResponseDto(found, singleResearches);
  }

  async insertSingleResearchToGroup(
    groupID: string,
    singleID: string,
    user: UserPayload,
  ): Promise<GroupResearch> {
    try {
      const researchGroup = await this.groupResearchRepository.findOneOrFail({
        where: { id: groupID, authUserId: user.sub },
      });
      const singleResearch = await this.singleResearchRepository.findOneOrFail({
        where: { id: singleID, authUserId: user.sub },
      });

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
