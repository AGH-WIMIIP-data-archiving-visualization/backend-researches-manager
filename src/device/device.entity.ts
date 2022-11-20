import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Device {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  _id: ObjectID;

  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  deviceName: string;

  @ApiProperty()
  @Column()
  scalingFunction: string;

  @ApiProperty()
  @Column()
  unit: string;

  @ApiProperty()
  @Column()
  deviceInput: number;
}
