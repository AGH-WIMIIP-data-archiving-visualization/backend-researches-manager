import { Module } from '@nestjs/common';
import { SingleResearchModule } from './single_research/single_research.module';
import { GroupResearchModule } from './group_research/group_research.module';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { SingleResearch } from './single_research/single_research.entity';

@Module({
  imports: [
    SingleResearchModule,
    GroupResearchModule,
    ProjectModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
