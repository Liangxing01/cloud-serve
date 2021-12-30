import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClothDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  code: string;

  type: number;

  price: string;

  combo: number;
  imgCode: string;
  imgCover: string;

  imgUrls: string;

  remark: string;
}
