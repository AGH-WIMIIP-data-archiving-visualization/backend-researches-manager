import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './DTO/create-device.dto';
import { v4 as uuid } from 'uuid';

export interface DeviceRepository extends Repository<Device> {
  createDevice(createDeviceDto: CreateDeviceDto): Promise<Device>;
}

export const customDeviceRepositoryMethods: Pick<
  DeviceRepository,
  'createDevice'
> = {
  async createDevice(createDeviceDto: CreateDeviceDto) {
    const { deviceInput, deviceName, scalingFunction, unit } = createDeviceDto;

    const device = this.create({
      id: uuid(),
      deviceInput: deviceInput,
      deviceName: deviceName,
      unit: unit,
      scalingFunction: scalingFunction,
    });

    await this.save(device);
    return device;
  },
};
