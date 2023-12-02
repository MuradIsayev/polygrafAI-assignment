import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email);
      const isMatch = await bcrypt.compare(loginDto.password, user.password);

      if (!isMatch) {
        throw new ForbiddenException('Password is incorrect');
      }

      return {
        access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      };
    } catch (error) {
      throw error;
    }
  }

  async register(createUserDto: CreateUserDto) {
    const foundUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new MethodNotAllowedException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = this.usersRepository.create(createUserDto);

    if (!user) throw new BadRequestException('User could not be created');

    await this.usersRepository.save(user);

    return true;
  }
}
