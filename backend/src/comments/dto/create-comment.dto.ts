import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The name or title of the comment',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content or body of the comment',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'The ID of the user who created the comment',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the post to which the comment belongs',
  })
  @IsNumber()
  @IsNotEmpty()
  postId: string;
}
