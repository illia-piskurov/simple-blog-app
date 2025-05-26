import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Short description of the post' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Main body content of the post' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
