import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
  @Get('/revTag/:revTag')
  revTagAvailable(@Param('revTag') revTag: string): Promise<boolean> {
    return this.userService.revTagAvailable(revTag);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
