import { Module } from '@nestjs/common';
import { SingleResearchController } from './single_research.controller';
import { SingleResearchService } from './single_research.service';

@Module({
  controllers: [SingleResearchController],
  providers: [SingleResearchService]
})
export class SingleResearchModule {}
