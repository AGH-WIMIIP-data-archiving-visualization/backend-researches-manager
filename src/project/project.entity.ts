import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
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
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  authUserId: string;

  @Column()
  projectName: string;

  @Column()
  description: string;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  groupsResearchIds: string[];

  @Column()
  singleResearchesIds: string[];
}
