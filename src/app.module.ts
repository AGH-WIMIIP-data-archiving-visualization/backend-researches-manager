import { Module } from '@nestjs/common';
import { SingleResearchModule } from './single-research/single-research.module';
import { GroupResearchModule } from './group-research/group-research.module';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AuthorizationModule } from './authorization/authorization.module';
import { DeviceModule } from './device/device.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    SingleResearchModule,
    GroupResearchModule,
    ProjectModule,
    AuthorizationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME') ?? null,
        password: configService.get('DB_PASSWORD') ?? null,
        database: configService.get('DB_DATABASE'),
        useUnifiedTopology: true,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    DeviceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
