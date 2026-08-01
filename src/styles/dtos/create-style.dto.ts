import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateStyleDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(1024)
  @IsNotEmpty()
  description: string;
}
