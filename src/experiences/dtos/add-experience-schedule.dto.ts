import { IsDateString, IsInt } from 'class-validator';

export class CreateExperienceScheduleDto {
  @IsDateString()
  startDateTime!: string;

  @IsDateString()
  endDateTime!: string;

  @IsInt()
  capacity!: number;
}
