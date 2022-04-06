import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  username: string;

  telphone: string;

  clothIds: string;

  time: string;

  startTime: string;

  endTime: string;

  price: number;

  remarkImgs: string;

  remark: string;
}
