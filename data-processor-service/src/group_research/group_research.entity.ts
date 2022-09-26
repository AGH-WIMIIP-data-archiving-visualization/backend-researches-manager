import { SingleResearch } from 'src/single_research/single_research.entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class GroupResearch {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  groupResearchName: string;

  @Column()
  description: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  singleResearches: SingleResearch[];
}
