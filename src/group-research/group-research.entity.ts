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
export class GroupResearch {
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
  groupResearchName: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  isPublic: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  singleResearchesIds: string[];
}
