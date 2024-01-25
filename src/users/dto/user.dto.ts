import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.entity';

export class UserDto {
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  role?: UserRole;

  @IsString()
  name: string;

  @IsEmail()
  gmail: string;
}
