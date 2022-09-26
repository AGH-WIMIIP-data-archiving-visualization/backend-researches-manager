import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { SingleRead } from './DTO/single_read.dto';

@Entity()
export class SingleResearch {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  deviceName: string;

  @Column()
  singleResearchName: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column()
  data: SingleRead[];
}
