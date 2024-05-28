import { UpdateUserDto } from './dto/updateUser.dto'
import { UserService } from './user.service'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { BasicUserDto } from './dto/BasicUser.dto'
import { TableRow } from './dto/TableRow.dto'
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator'
import { User } from '@prisma/client'
import { JwtAuth } from 'src/auth/decorators/JwtAuth.decorator'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    findAll(): Promise<BasicUserDto[]> {
        return this.userService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<BasicUserDto> {
        return this.userService.findOne(id)
    }
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id)
    }

    @JwtAuth()
    @Patch()
    update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(user.id, updateUserDto)
    }
    @Get('/revTag/:revTag')
    revTagAvailable(@Param('revTag') revTag: string): Promise<boolean> {
        return this.userService.revTagAvailable(revTag)
    }
    @JwtAuth()
    @Get('friends')
    findFriends(@CurrentUser() user: User): Promise<Array<BasicUserDto>> {
        return this.userService.findFriends(user.id)
    }
    @Get('/auth0/:id')
    findAuth0(@Param('id') id: string): Promise<BasicUserDto> {
        return this.userService.findAuth0(id)
    }
    @JwtAuth()
    @Get('table')
    getUserTable(@CurrentUser() user: User): Promise<Array<TableRow>> {
        return this.userService.getUserTable(user.id)
    }
}
