import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DeviceController } from './device.controller';
import { Device } from './device.entity';
import { customDeviceRepositoryMethods } from './device.repository';
import { DeviceService } from './device.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DeviceController],

  providers: [
    {
      provide: getRepositoryToken(Device),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Device)
          .extend(customDeviceRepositoryMethods);
      },
    },
    DeviceService,
  ],
})
export class DeviceModule {}
