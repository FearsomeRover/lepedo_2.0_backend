import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserService } from './user.service'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Debt } from './entities/debt.entity'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { BasicUserDto } from './dto/BasicUser.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    /**
     * This endpoint returns all users
     */
    @Get()
    findAll(): Promise<BasicUserDto[]> {
        return this.userService.findAll()
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<BasicUserDto> {
        return this.userService.create(createUserDto)
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<BasicUserDto> {
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
    @Get('/:id/debts')
    findOthers(@Param('id') id: string): Promise<Array<Debt>> {
        return this.userService.findOthers(id)
    }

    @Get('/revTag/:revTag')
    revTagAvailable(@Param('revTag') revTag: string): Promise<boolean> {
        return this.userService.revTagAvailable(revTag)
    }
}
