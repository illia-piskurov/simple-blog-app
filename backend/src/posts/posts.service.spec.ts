import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: Repository<Post>;
  let usersRepository: Repository<User>;

  const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    posts: [],
  };

  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'Test Content',
    user: mockUser,
    comments: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(post => Promise.resolve({ ...post, id: '1' })),
            createQueryBuilder: jest.fn(() => ({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              loadRelationCountAndMap: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([mockPost]),
            })),
            findOne: jest.fn().mockImplementation(({ where: { id } }) =>
              id === '1' ? Promise.resolve(mockPost) : Promise.resolve(null)
            ),
            delete: jest.fn().mockImplementation((id) =>
              id === '1' ? Promise.resolve({ affected: 1 }) : Promise.resolve({ affected: 0 })
            ),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockImplementation(({ where: { id } }) =>
              id === '1' ? Promise.resolve(mockUser) : Promise.resolve(null)
            ),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post for an existing user', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        description: 'Test Description',
        body: 'Test Body',
      };

      const result = await service.create('1', createPostDto);

      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(postsRepository.create).toHaveBeenCalledWith({
        ...createPostDto,
        user: mockUser,
      });
      expect(postsRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        ...createPostDto,
        user: mockUser,
        id: '1',
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        description: 'Test Description',
        body: 'Test Body',
      };

      await expect(service.create('999', createPostDto)).rejects.toThrow(
        new NotFoundException('User with id "999" not found.')
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of posts with author and comments count', async () => {
      const result = await service.findAll();

      expect(postsRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual([mockPost]);
    });
  });

  describe('findOne', () => {
    it('should return a post with user and comments', async () => {
      const result = await service.findOne('1');

      expect(postsRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: {
          user: true,
          comments: {
            user: true,
          },
        },
      });
      expect(result).toEqual(mockPost);
    });

    it('should return null when post does not exist', async () => {
      const result = await service.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
        description: 'Updated Description',
        body: 'Updated Body',
      };

      const result = await service.update('1', updatePostDto);

      expect(postsRepository.save).toHaveBeenCalledWith({
        ...updatePostDto,
        id: '1',
      });
      expect(result).toEqual({
        ...updatePostDto,
        id: '1',
      });
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      await service.remove('1');

      expect(postsRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when post does not exist', async () => {
      await expect(service.remove('999')).rejects.toThrow(
        new NotFoundException('Post with id "999" not found.')
      );
    });
  });
});