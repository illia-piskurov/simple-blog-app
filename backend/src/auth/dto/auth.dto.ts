import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGci01jI1nZ...',
  })
  accesToken: string;
}