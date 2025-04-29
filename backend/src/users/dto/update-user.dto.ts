import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "User's first name", required: false })
  firstName?: string;

  @ApiProperty({ description: "User's last name", required: false })
  lastName?: string;

  @ApiProperty({ description: "User's age", required: false })
  age?: number;

  @ApiProperty({ description: "User's gender", required: false })
  gender?: string;

  @ApiProperty({ description: "User's address", required: false })
  address?: string;

  @ApiProperty({ description: "User's website", required: false })
  website?: string;
}
