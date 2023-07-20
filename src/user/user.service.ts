import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserModule } from './user.module';

interface TableUser {
  user: User;
  received: number;
  payed: number;
  transferred: number;
  gotTarnsferred: number;
  sum: number;
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      if (e.code === 'P2002') {
        ///failed unique constraint
        throw new ConflictException('Revolut tag already in use');
      } else {
        throw e;
      }
    }
  }

  async getTable() {
    //haaat ez eleg undi...
    const u = await this.prisma.user.findMany();
    let e = await this.prisma.expense.findMany({
      include: { received: true },
    });
    let t = await this.prisma.transfer.findMany({});
    let final = {};
    u.forEach((cur) => {
      final[cur.id] = {
        revTag: cur.revTag,
        name: cur.name,
        color: cur.color,
        spent: 0,
        paid: 0,
        transferfrom: 0,
        transferto: 0,
        balance: 0,
        deleteable: true,
      };
    });

    //calculate the first 2 col
    e.forEach((cure) => {
      final[cure.payerId].paid += cure.amount;
      final[cure.payerId].deleteable = false;
      cure.received.forEach((curuserto) => {
        final[curuserto.id].spent += Math.ceil(
          cure.amount / cure.received.length,
        );
        final[curuserto.id].deleteable = false;
      });
    });

    //calculate the sec 2 col
    t.forEach((curt) => {
      final[curt.userFromId].transferfrom += curt.amount;
      final[curt.userToId].transferto += curt.amount;
      final[curt.userFromId].deleteable = false;
      final[curt.userToId].deleteable = false;
    });

    //calculate final balance
    u.forEach((cur) => {
      final[cur.id].balance =
        final[cur.id].paid -
        final[cur.id].spent +
        final[cur.id].transferfrom -
        final[cur.id].transferto;
    });

    let spentall = 0;
    e.forEach((cur) => {
      spentall += cur.amount;
    });

    let doneall = 0;
    let curmin = final[u[0].id].spent;
    let curminname = u[0].name;
    u.forEach((cur) => {
      if (final[cur.id].balance < 0) doneall += final[cur.id].balance;
      if (final[cur.id].spent < curmin) {
        curmin = final[cur.id].spent;
        curminname = cur.name;
      }
    });
    doneall += spentall;

    return {
      table: final,
      stats: {
        thrifty: curminname,
        doneall: doneall,
        spentall: spentall,
      },
    };
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
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Revolut tag already in use');
      } else {
        throw e;
      }
    }
  }
  async thrifty() {
    const expenses = await this.prisma.expense.findMany({});
    console.log(expenses);
  }
}
