import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  username: string;

  telphone: string;

  cIds: string;

  time: string;

  remark: string;
}
