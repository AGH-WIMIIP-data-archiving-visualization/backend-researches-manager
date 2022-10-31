import {
  Body,
  Controller,
  Get,
  OnModuleInit,
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

  @Get('grpcTest')
  getLabjackData(): Promise<LabjackConnectorResponse> {
    return this.labjackConnectorService.GetLabjackData({
      analogInputNo: 0,
      duration: 10,
    });
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
  @Patch('/:id/research')
  async conductLabjackResearch(
    @GetUser() user: UserPayload,
    @Param('id') id: string,
    @Body() labjackConnectorInput: LabjackConnectorInput,
  ): Promise<SingleResearch> {
    const researchData = (
      await this.labjackConnectorService.GetLabjackData(labjackConnectorInput)
    ).response;

    return this.singleResearchService.conductLabjackResearch(
      id,
      researchData,
      user,
    );
  }
}
