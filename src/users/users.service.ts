import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
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

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
