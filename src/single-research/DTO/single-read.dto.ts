import { ApiProperty } from '@nestjs/swagger';

export class SingleRead {
  @ApiProperty()
  iteration: number;
  @ApiProperty()
  voltageValue: number;
}
