import { Module } from '@nestjs/common';
import { GroupResearchController } from './group_research.controller';
import { GroupResearchService } from './group_research.service';

@Module({
  controllers: [GroupResearchController],
  providers: [GroupResearchService]
})
export class GroupResearchModule {}
