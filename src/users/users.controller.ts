import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('me')
  getUserInfo(@GetUser() user: User) {
    return this.usersService.getUserInfo(user);
  }
}
