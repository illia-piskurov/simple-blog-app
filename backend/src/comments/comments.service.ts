import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { PostComment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostComment)
    private commentsRepository: Repository<PostComment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addComment(createCommentDto: CreateCommentDto): Promise<PostComment> {
    const post = await this.postsRepository.findOne({
      where: { id: createCommentDto.postId },
    });
    const user = await this.usersRepository.findOne({
      where: { id: createCommentDto.userId },
    });

    if (!post || !user) {
      throw new NotFoundException('Post or User not found');
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      post,
      user,
    });

    await this.commentsRepository.save(comment);
    return comment;
  }

  async findAllOfOnePost(postId: number): Promise<PostComment[]> {
    const foundComments = await this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });

    return foundComments;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const foundComment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!foundComment) {
      throw new NotFoundException('Comment not found.');
    }

    return this.usersRepository.save({ ...updateCommentDto, id });
  }

  async remove(id: number) {
    const foundComment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!foundComment) {
      throw new NotFoundException('Comment not found.');
    }

    return this.usersRepository.delete(id);
  }
}
