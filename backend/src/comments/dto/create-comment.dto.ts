import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  nameOfComment: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  postId: string;
}
