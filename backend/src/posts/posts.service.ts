import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersRepository.findOne({
      where: { id: createPostDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPostDto.userId} not found.`,
      );
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user,
    });

    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postsRepository.save({ ...updatePostDto, id });
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
