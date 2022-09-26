import { GroupResearch } from 'src/group_research/group_research.entity';
import { SingleResearch } from 'src/single_research/single_research.entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  groupsResearches: GroupResearch[];

  @Column()
  singleResearches: SingleResearch[];
}
