import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExperienceType } from '../enums/experience-type.enum';

export class CreateExperienceDto {
  @IsString()
  name!: string;

  @IsString()
  shortDescription!: string;

  @IsString()
  description!: string;

  @IsEnum(ExperienceType)
  type!: ExperienceType;

  @IsInt()
  durationMinutes!: number;

  @IsInt()
  minPeople!: number;

  @IsInt()
  maxPeople!: number;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  meetingPoint?: string;

  @IsOptional()
  @IsString()
  included?: string;

  @IsOptional()
  @IsString()
  notIncluded?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  recommendations?: string;

  @IsOptional()
  @IsInt()
  coverImageId?: number;

  @IsOptional()
  @IsBoolean()
  isPrivateAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
