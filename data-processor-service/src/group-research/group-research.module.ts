import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { SingleResearchModule } from 'src/single-research/single-research.module';
import { DataSource } from 'typeorm';
import { GroupResearchController } from './group-research.controller';
import { GroupResearch } from './group-research.entity';
import { customGroupResearchRepositoryMethods } from './group-research.repository';
import { GroupResearchService } from './group_research.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupResearch, SingleResearch])],
  controllers: [GroupResearchController],

  providers: [
    {
      provide: getRepositoryToken(GroupResearch),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(GroupResearch)
          .extend(customGroupResearchRepositoryMethods);
      },
    },
    GroupResearchService,
  ],
})
export class GroupResearchModule {}
