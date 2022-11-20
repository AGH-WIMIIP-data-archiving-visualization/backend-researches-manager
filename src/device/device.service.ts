import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DeviceRepository } from './device.repository';
import { CreateDeviceDto } from './DTO/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: DeviceRepository,
  ) {}

  createDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceRepository.createDevice(createDeviceDto);
  }

  async getAllDevices(): Promise<Device[]> {
    const devices = await this.deviceRepository.find();
    return devices;
  }

  async getDeviceById(id: string): Promise<Device> {
    const found = await this.deviceRepository.findOne({
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(`Device with ${id} id does not extist`);
    }
    return found;
  }

  async deleteDeviceById(id: string): Promise<void> {
    const result = await this.deviceRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Device with Id ${id} not found `);
    }
  }
}
