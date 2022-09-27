import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
} from 'typeorm';
import { SingleRead } from './DTO/single_read.dto';

@Entity()
export class SingleResearch {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  deviceName: string;

  @Column()
  singleResearchName: string;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column((type) => SingleRead)
  data: SingleRead[];
}
