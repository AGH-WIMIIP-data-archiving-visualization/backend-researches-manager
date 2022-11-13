import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  _id: ObjectID;

  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  authUserId: string;

  @ApiProperty()
  @Column()
  projectName: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ default: false })
  isPublic: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  @Column()
  groupsResearchIds: string[];

  @Exclude({ toPlainOnly: true })
  @Column()
  singleResearchesIds: string[];
}
