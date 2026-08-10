import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAcademyDto } from './create-academy.dto';
import { IsInt, IsOptional } from 'class-validator';

export class PatchAcademyDto extends PartialType(CreateAcademyDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsOptional()
  academy_id!: number;
}
