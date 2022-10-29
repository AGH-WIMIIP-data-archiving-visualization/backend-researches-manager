import { SingleResearch } from 'src/single-research/single-research.entity';
import { GroupResearchResponseDto } from '../DTO/response-group-research.dto ';
import { GroupResearch } from '../group-research.entity';

export const groupResearchToGroupResearchResponseDto = (
  groupResearch: GroupResearch,
  singleResearches: SingleResearch[],
): GroupResearchResponseDto => {
  const {
    _id,
    createdAt,
    description,
    groupResearchName,
    id,
    isPublic,
    singleResearchesIds,
    updatedAt,
  } = groupResearch;

  const singleResearchArray =
    singleResearchesIds &&
    singleResearchesIds.map((x) => singleResearches.find((a) => a.id === x));

  return {
    _id: _id,
    id: id,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: description,
    groupResearchName: groupResearchName,
    isPublic: isPublic,
    singleResearches: singleResearchArray,
  };
};
