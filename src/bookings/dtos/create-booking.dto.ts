// src/bookings/dtos/create-booking.dto.ts

import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  scheduleId!: number;

  @IsString()
  @MaxLength(150)
  contactName!: string;

  @IsEmail()
  @MaxLength(150)
  contactEmail!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  contactPhone?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  peopleCount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  specialRequests?: string;
}
