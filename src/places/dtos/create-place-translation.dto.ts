// src/places/dtos/create-place-translation.dto.ts

import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePlaceTranslationDto {
  @IsString()
  @MaxLength(5)
  languageCode!: string;

  @IsString()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
