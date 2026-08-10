import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAcademyDto {
  @ApiProperty({
    description: 'This is the academy name',
    example: 'Bsoul studio',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'This is the academy description',
    example: 'Academia de baile wenarda',
  })
  @MinLength(4)
  @MaxLength(1024)
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'This is the academy location',
    example: 'Rosas 1234',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(1024)
  @IsNotEmpty()
  location!: string;

  @ApiProperty({
    description: 'This is the academy phone',
    example: '+56912346578',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'academy url page',
    example: 'http://localhost.com/images.cl',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  website_url?: string;

  @ApiPropertyOptional({
    description: 'Instagram url academy',
    example: 'http://localhost.com/images.cl',
  })
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(1024)
  instagram_url?: string;

  @ApiProperty({
    description: 'This is the academ map url location',
    example: 'http://localhost.com/images.cl',
  })
  @IsUrl()
  @MinLength(4)
  @MaxLength(1024)
  @IsOptional()
  maps_url!: string;

  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: 'integer', required: true, example: 79 })
  @IsNotEmpty()
  @IsInt()
  comuna_id!: number;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map((v) => parseInt(v, 10));
    if (typeof value === 'string') {
      if (value.includes(','))
        return value.split(',').map((v) => parseInt(v.trim(), 10));
      return [parseInt(value, 10)];
    }
    return value;
  })
  @ApiProperty({ description: 'Array of styles ids', example: [1, 2] })
  @IsArray()
  @IsInt({ each: true })
  style_ids!: number[];
}
