import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content or body of the comment',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'The ID of the post to which the comment belongs',
  })
  @IsString()
  @IsNotEmpty()
  postId: string;
}
