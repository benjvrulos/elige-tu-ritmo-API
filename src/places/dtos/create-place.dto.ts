import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { PlaceType } from '../enums/place-type.enum';

export class CreatePlaceDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(PlaceType)
  type!: PlaceType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  comunaId?: number;

  @IsOptional()
  @IsInt()
  imageId?: number;

  @IsOptional()
  @IsInt()
  estimatedVisitMinutes?: number;
}
