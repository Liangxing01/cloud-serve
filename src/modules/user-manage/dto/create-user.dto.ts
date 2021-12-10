import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  remark: string;

  telphone: string;
}
