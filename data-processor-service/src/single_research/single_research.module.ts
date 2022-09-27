import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SingleResearchController } from './single_research.controller';
import { SingleResearch } from './single_research.entity';
import { customSingleResearchRepositoryMethods } from './single_research.repository';
import { SingleResearchService } from './single_research.service';

@Module({
  imports: [TypeOrmModule.forFeature([SingleResearch])],
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
