import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;

    const existedEmail = await this.usersRepository.findOne({
      where: { email },
    });
    if (existedEmail) {
      throw new ForbiddenException('Email already existed.');
    }
    const existedUsername = await this.usersRepository.findOne({
      where: { username },
    });
    if (existedUsername) {
      throw new ForbiddenException('Username already existed.');
    }

    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match.',
      );
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return this.usersRepository.save({ ...updateUserDto, id });
  }

  async remove(id: number): Promise<boolean> {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return (await this.usersRepository.delete(id)) ? true : false;
  }
}
