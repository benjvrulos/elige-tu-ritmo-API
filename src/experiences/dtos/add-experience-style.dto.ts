import { IsInt } from 'class-validator';

export class AddExperienceStyleDto {
  @IsInt()
  styleId!: number;
}
