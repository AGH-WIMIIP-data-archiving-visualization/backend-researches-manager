import {
  Body,
  Controller,
  Delete,
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
import { ConductLabjackResearchDto } from './DTO/conduct-labjack-research.dto';

@UseGuards(AuthGuard('jwt'))
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

  @Get()
  getAllSingleResearches(
    @GetUser() user: UserPayload,
  ): Promise<SingleResearch[]> {
    return this.singleResearchService.getAllSingleResearches(user);
  }

  @Get('/:id')
  getSingleResearchById(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
  ): Promise<SingleResearch> {
    return this.singleResearchService.getSingleResearchById(id, user);
  }

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
  @Patch('/:id')
  async conductLabjackResearch(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
    @Body() conductLabjackResearchDto: ConductLabjackResearchDto,
  ): Promise<SingleResearch> {
    return this.singleResearchService.conductLabjackResearch(
      id,
      conductLabjackResearchDto,
      user,
    );
  }

  @Delete('/:id')
  deleteResearchById(
    @Param('id') id: string,
    @GetUser() user: UserPayload,
  ): Promise<void> {
    return this.singleResearchService.deleteResearchById(id, user);
  }
}
