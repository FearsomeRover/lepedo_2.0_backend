import { UpdateUserDto } from './dto/updateUser.dto'
import { UserService } from './user.service'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { BasicUserDto } from './dto/BasicUser.dto'
import { TableRow } from './dto/TableRow.dto'

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
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Get('/revTag/:revTag')
    revTagAvailable(@Param('revTag') revTag: string): Promise<boolean> {
        return this.userService.revTagAvailable(revTag)
    }

    @Get('/:id/friends')
    findFriends(@Param('id') id: string): Promise<Array<BasicUserDto>> {
        return this.userService.findFriends(id)
    }
    @Get('/auth0/:id')
    findAuth0(@Param('id') id: string): Promise<BasicUserDto> {
        return this.userService.findAuth0(id)
    }
    @Get('/:id/table')
    getUserTable(@Param('id') id: string): Promise<Array<TableRow>> {
        return this.userService.getUserTable(id)
    }
}
