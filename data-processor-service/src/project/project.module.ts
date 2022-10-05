import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
import { DataSource } from 'typeorm';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { customProjectRepositoryMethods } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, GroupResearch, SingleResearch])],
  controllers: [ProjectController],

  providers: [
    {
      provide: getRepositoryToken(Project),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Project)
          .extend(customProjectRepositoryMethods);
      },
    },
    ProjectService,
  ],
})
export class ProjectModule {}
