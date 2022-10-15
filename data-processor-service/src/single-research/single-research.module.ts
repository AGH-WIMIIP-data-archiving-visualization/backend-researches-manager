import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { Project } from 'src/project/project.entity';
import { DataSource } from 'typeorm';
import { SingleResearchController } from './single-research.controller';
import { SingleResearch } from './single-research.entity';
import { customSingleResearchRepositoryMethods } from './single-research.repository';
import { SingleResearchService } from './single-research.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, GroupResearch, SingleResearch])],
  controllers: [SingleResearchController],

  providers: [
    {
      provide: getRepositoryToken(SingleResearch),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(SingleResearch)
          .extend(customSingleResearchRepositoryMethods);
      },
    },
    SingleResearchService,
  ],
})
export class SingleResearchModule {}
