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
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  authUserId: string;

  @Column()
  deviceName: string;

  @Column()
  singleResearchName: string;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  data: SingleRead[];
}
