import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAcademyDto } from './create-academy.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchAcademyDto extends PartialType(CreateAcademyDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
