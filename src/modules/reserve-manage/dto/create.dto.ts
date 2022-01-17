import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  username: string;

  telphone: string;

  wxName: string;

  time: number;

  date: string;

  type: number;

  remark: string;
}
