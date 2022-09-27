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
export class GroupResearch {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  groupResearchName: string;

  @Column()
  description: string;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column((type) => SingleResearch)
  singleResearches: SingleResearch[];
}
