import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExperiencePlaceTranslationDto {
  @IsString()
  @MaxLength(5)
  languageCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
