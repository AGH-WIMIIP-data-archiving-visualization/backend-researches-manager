import { GroupResearch } from 'src/group_research/group_research.entity';
import { SingleResearch } from 'src/single_research/single_research.entity';
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
