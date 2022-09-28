import { GroupResearch } from 'src/group-research/group-research.entity';
import { SingleResearch } from 'src/single-research/single-research.entity';
import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

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

  @Column((type) => GroupResearch)
  groupsResearches: GroupResearch[];

  @Column((type) => SingleResearch)
  singleResearches: SingleResearch[];
}
