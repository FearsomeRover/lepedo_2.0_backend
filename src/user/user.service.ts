import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.revTagAvailable(createUserDto.revTag)) {
      return await this.prisma.user.create({ data: createUserDto });
    }
    throw new ConflictException('Revolut tag already in use');
  }
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async findOne(id: string) {
    const link = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!link) {
      throw new NotFoundException('This user does not exist');
    }
    return link;
  }
  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
  async revTagAvailable(revTag: string): Promise<boolean> {
    return (
      (await this.prisma.user.findFirst({
        where: { revTag },
      })) === null
    );
  }
  async update(id: string, updateUserDto: updateUserDto): Promise<User> {
    if (
      !updateUserDto.revTag || //if revTag is not updated
      (await this.findOne(id)).revTag === updateUserDto.revTag || //or revTag is updated, but the same, as before
      (await this.revTagAvailable(updateUserDto.revTag)) //and if it is really updated, check if its available
    ) {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    }
    throw new ConflictException('Revolut tag already in use');
  }
}
