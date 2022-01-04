import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  username: string;

  telphone: string;

  cIds: string;

  time: string;

  remark: string;
}

export class ScheduleInfoDTO {
  username: string;

  userId: number;

  clothId: number;

  clothName: string;

  clothType: number;

  clothImg: string;

  startTime: string;

  endTime: string;
}
