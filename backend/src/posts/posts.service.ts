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
  ) { }

  async create(id: string, createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id "${id}" not found.`,
      );
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user,
    });

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'author')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .getMany();

    return posts;
  }

  async findOne(id: string): Promise<Post | null> {
    return await this.postsRepository.findOne({
      where: { id },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      }
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postsRepository.save({ ...updatePostDto, id });
  }

  async remove(id: string) {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id "${id}" not found.`);
    }
  }
}
