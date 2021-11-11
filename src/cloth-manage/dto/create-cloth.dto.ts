import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClothDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  code: string;

  type: number;

  priceType: number;

  imgUrls: string;

  remark: string;
}
