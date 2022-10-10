import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  GetUser,
  UserPayload,
} from 'src/authorization/authorization.decorator';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleRead } from './DTO/single_read.dto';
import { SingleResearch } from './single-research.entity';
import { SingleResearchService } from './single-research.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('single-research')
export class SingleResearchController {
  constructor(private singleResearchService: SingleResearchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllSingleResearches(
    @GetUser() user: UserPayload,
  ): Promise<SingleResearch[]> {
    return this.singleResearchService.getAllSingleResearches(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getSingleResearchById(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
  ): Promise<SingleResearch> {
    return this.singleResearchService.getSingleResearchById(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createSingleResearch(
    @GetUser() user: UserPayload,
    @Body() createSingleResearch: CreateSingleResearchkDto,
  ): Promise<SingleResearch> {
    return this.singleResearchService.createSingleResearch(
      createSingleResearch,
      user,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id/data')
  insertDataToSingleResearch(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
    @Body() data: SingleRead[],
  ): Promise<SingleResearch> {
    return this.singleResearchService.insertDataToSingleResearch(
      id,
      data,
      user,
    );
  }
}
