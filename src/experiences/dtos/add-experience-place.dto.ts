import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddExperiencePlaceDto {
  @IsInt()
  placeId!: number;

  @IsInt()
  position!: number;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
