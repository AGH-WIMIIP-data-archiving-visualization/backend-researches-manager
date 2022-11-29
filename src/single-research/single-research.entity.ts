import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { SingleRead } from './DTO/single-read.dto';

@Entity()
export class SingleResearch {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  _id: string;

  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  authUserId: string;

  @ApiProperty()
  @Column()
  deviceName?: string;

  @ApiProperty()
  @Column()
  scalingFunction: string;

  @ApiProperty()
  @Column()
  unit: string;

  @ApiProperty()
  @Column()
  singleResearchName: string;

  @ApiProperty()
  @Column()
  isPublic: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ isArray: true, type: SingleRead })
  @Column()
  data: SingleRead[];
}
