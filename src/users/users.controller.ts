import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getUserInfo(@GetUser() user: User) {
    return this.usersService.getUserInfo(user);
  }
}
