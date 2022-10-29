import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { ProjectResponseDto } from '../DTO/response-project.dto';
import { Project } from '../project.entity';

export const projectToProjectResponseDto = (
  project: Project,
  groupResearches: GroupResearch[],
  singleResearches: SingleResearch[],
): ProjectResponseDto => {
  const {
    _id,
    createdAt,
    description,
    authUserId,
    groupsResearchIds,
    projectName,
    id,
    isPublic,
    singleResearchesIds,
    updatedAt,
  } = project;

  const singleResearchArray =
    singleResearchesIds &&
    singleResearchesIds.map((x) => singleResearches.find((a) => a.id === x));

  const groupResearchArray =
    groupsResearchIds &&
    groupsResearchIds.map((x) => groupResearches.find((a) => a.id === x));

  return {
    _id: _id,
    id: id,
    projectName: projectName,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: description,
    groupsResearch: groupResearchArray,
    isPublic: isPublic,
    singleResearches: singleResearchArray,
  };
};
