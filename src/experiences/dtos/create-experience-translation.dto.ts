import { IsOptional, IsString } from 'class-validator';

export class CreateExperienceTranslationDto {
  @IsString()
  languageCode!: string;

  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsString()
  shortDescription!: string;

  @IsString()
  description!: string;

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
}
