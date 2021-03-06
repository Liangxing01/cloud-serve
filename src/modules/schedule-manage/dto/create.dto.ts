import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  username: string;

  telphone: string;

  clothId: number;

  startTime: string;

  endTime: string;

  remark: string;
}
