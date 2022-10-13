import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HttpMessage, Utils } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async findAll(query): Promise<FindAllUserDto> {
    const columns = this.usersRepository.metadata.columns;
    const take = Utils.getTake(query);
    const skip = Utils.getSkip(query);
    const order = Utils.getOrder(query);
    const search = Utils.getSearch(query, columns);

    const [items, total] = await this.usersRepository.findAndCount({
      where: search ? search : query,
      order: order,
      skip: skip,
      take: take,
    });

    return {
      total: total,
      hasNext: total > skip + take,
      items: items,
    };
  }

  async findOne(id: number): Promise<CreateUserDto> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(body: any[], id: number): Promise<void> {
    let ids = [];

    if (id) {
      ids.push({ id });
    } else if (body.length) {
      ids = [...body];
    } else {
      throw new HttpException(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }
}
