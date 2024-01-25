import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      const newUser = this.authRepository.create({
        gmail: dto.gmail,
        password: hash,
      });
      // const user = await this.prisma.user.create({
      //   data: {
      //     email: dto.email,
      //     hash,
      //   },
      // });
      // return this.signToken(user.id, user.email);
      return this.signToken(newUser.id, newUser.gmail);
    } catch (error) {}
  }

  async signin(dto: AuthDto) {
    // find the user by email
  }

  async signToken(
    userId: string,
    gmail: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      gmail,
    };

    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
