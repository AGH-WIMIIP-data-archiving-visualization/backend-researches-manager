import { Module } from '@nestjs/common';
import { SingleResearchModule } from './single_research/single_research.module';
import { GroupResearchModule } from './group_research/group_research.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [SingleResearchModule, GroupResearchModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
