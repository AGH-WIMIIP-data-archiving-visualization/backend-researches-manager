import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class SingleResearch {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ default: false })
  visited: boolean;
}
