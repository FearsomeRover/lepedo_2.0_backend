import { User } from '@prisma/client'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserService } from './user.service'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    findAll() {
        return this.userService.findAll()
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto)
    }
    @Get('/table')
    getTable() {
        return this.userService.getTable()
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id)
    }
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id)
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }
    @Get('/revTag/:revTag')
    revTagAvailable(@Param('revTag') revTag: string): Promise<boolean> {
        return this.userService.revTagAvailable(revTag)
    }
}
