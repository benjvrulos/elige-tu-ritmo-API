import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'This is the academy location',
    example: 'Rosas 1234',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(1024)
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'This is the academy phone',
    example: '+56912346578',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  phone: string;

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
  @IsOptional()
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
  @IsNotEmpty()
  maps_url: string;

  @IsUrl()
  @MinLength(4)
  @MaxLength(1024)
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: 'integer', required: true, example: 79 })
  @IsNotEmpty()
  @IsInt()
  comuna_id: number;

  @ApiProperty({ description: 'Array of styles ids', example: [1, 2] })
  @IsArray()
  @IsInt({ each: true })
  style_ids: number[];
}
