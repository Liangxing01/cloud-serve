import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsOptional()
  account: string;

  password: string;
}
