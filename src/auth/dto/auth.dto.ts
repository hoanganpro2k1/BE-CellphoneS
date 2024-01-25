import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  gmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
