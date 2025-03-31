import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  nameOfComment: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
