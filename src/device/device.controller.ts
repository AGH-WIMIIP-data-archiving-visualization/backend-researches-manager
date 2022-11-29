import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './DTO/create-device.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}
  @ApiCreatedResponse({
    isArray: true,
    type: Device,
  })
  @Get()
  getAllDevices(): Promise<Device[]> {
    return this.deviceService.getAllDevices();
  }

  @Get('/:id')
  getDeviceById(@Param('id') id: string): Promise<Device> {
    return this.deviceService.getDeviceById(id);
  }

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @Delete('/:id')
  deleteDeviceByID(@Param('id') id: string): Promise<void> {
    return this.deviceService.deleteDeviceById(id);
  }
}
