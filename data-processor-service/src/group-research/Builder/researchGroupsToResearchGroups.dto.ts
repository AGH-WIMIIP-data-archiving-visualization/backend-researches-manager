import { SingleResearch } from 'src/single-research/single-research.entity';
import { GroupResearchResponseDto } from '../DTO/response-group-research.dto ';
import { GroupResearch } from '../group-research.entity';

export const groupsResearchToGroupsResearchResponseDto = (
  groupResearch: GroupResearch[],
  singleResearches: SingleResearch[],
): GroupResearchResponseDto[] => {
  return groupResearch.map((e) => {
    const singleResearchArray =
      e.singleResearchesIds &&
      e.singleResearchesIds.map((x) =>
        singleResearches.find((a) => a.id === x),
      );

    return {
      _id: e._id,
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      description: e.description,
      groupResearchName: e.groupResearchName,
      isPublic: e.isPublic,
      singleResearches: singleResearchArray,
    };
  });
};
