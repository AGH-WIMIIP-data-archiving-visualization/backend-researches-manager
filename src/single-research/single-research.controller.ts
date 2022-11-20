import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GetUser,
  UserPayload,
} from 'src/authorization/authorization.decorator';
import { CreateSingleResearchkDto } from './DTO/create-single-research.dto';
import { SingleResearch } from './single-research.entity';
import { SingleResearchService } from './single-research.service';
import { AuthGuard } from '@nestjs/passport';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { labjackConnectorClientOptions } from '../microsevices/labjack-connector-client';
import {
  LabjackConnectorService,
  LabjackConnectorResponse,
  LabjackConnectorInput,
} from 'proto/build/labjack-connector';
import { SingleRead } from './DTO/single-read.dto';
import { date } from '@hapi/joi';

@Controller('single-research')
export class SingleResearchController implements OnModuleInit {
  @Client(labjackConnectorClientOptions)
  private readonly client1: ClientGrpc;
  private labjackConnectorService: LabjackConnectorService;

  constructor(private singleResearchService: SingleResearchService) {}

  onModuleInit() {
    this.labjackConnectorService =
      this.client1.getService<LabjackConnectorService>(
        'LabjackConnectorService',
      );
  }

  @Get('labjack-1')
  getLabjackData(
    @Query() labjackConnectorInput: LabjackConnectorInput,
  ): Promise<LabjackConnectorResponse> {
    return this.labjackConnectorService.GetLabjackData(labjackConnectorInput);
  }

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
  @Patch('/:id')
  async conductLabjackResearch(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
    @Body() researchData: SingleRead[],
  ): Promise<SingleResearch> {
    return this.singleResearchService.conductLabjackResearch(
      id,
      researchData,
      user,
    );
  }
}
