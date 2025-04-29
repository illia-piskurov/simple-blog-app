import { PostComment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text')
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => PostComment, (comment) => comment.post)
  comments: PostComment[];
}
