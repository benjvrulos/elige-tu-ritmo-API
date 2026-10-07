import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddExperienceAcademyDto {
  @IsInt()
  academyId!: number;

  @IsOptional()
  @IsInt()
  position?: number;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
