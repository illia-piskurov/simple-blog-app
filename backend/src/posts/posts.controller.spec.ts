import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

// Моки для кастомных декораторов
jest.mock('src/auth/decorators/authorized.decorator', () => ({
  Authorized: jest.fn().mockImplementation((key: string) => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
      // Мокаем декоратор, чтобы просто возвращать значение
      target[propertyKey] = jest.fn().mockImplementation((userId: string, ...args: any[]) => {
        return userId; // Просто возвращаем переданный userId
      });
    };
  }),
}));

jest.mock('src/auth/decorators/authorization.decorator', () => ({
  Authorization: jest.fn().mockImplementation(() => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      // Ничего не делаем, просто мокаем декоратор
    };
  }),
}));

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockUser: User = {
    id: 'user123',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    age: 30,
    gender: 'male',
    address: '123 Test Street',
    website: 'https://example.com',
    createdAt: new Date(),
    posts: [],
    comments: [],
    // эти методы могут быть закомментированы или заменены заглушками
    hashPassword: async () => { },
    comparePassword: async () => true,
  };


  const mockPost: Post = {
    id: '1',
    title: 'Test Post',
    description: 'Description of test post',
    body: 'Test Content Body',
    createdAt: new Date(),
    user: mockUser,
    comments: [],
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockPost),
            findAll: jest.fn().mockResolvedValue([mockPost]),
            findOne: jest.fn().mockImplementation((id: string) =>
              id === '1' ? Promise.resolve(mockPost) : Promise.resolve(null)
            ),
            update: jest.fn().mockImplementation((id: string, dto: UpdatePostDto) =>
              Promise.resolve({ ...mockPost, ...dto })
            ),
            remove: jest.fn().mockImplementation((id: string) =>
              id === '1' ? Promise.resolve() : Promise.reject(new NotFoundException())
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a post with authorized user', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        description: 'Test Description',
        body: 'Test Body',
      };

      const userId = 'user123';
      const result = await controller.create(userId, createPostDto);

      expect(service.create).toHaveBeenCalledWith(userId, createPostDto);
      expect(result).toEqual(mockPost);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPost]);
    });
  });

  describe('findOne', () => {
    it('should return a post when it exists', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPost);
    });

    it('should return null when post does not exist', async () => {
      const result = await controller.findOne('999');

      expect(service.findOne).toHaveBeenCalledWith('999');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing post', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
      };

      const result = await controller.update('1', updatePostDto);

      expect(service.update).toHaveBeenCalledWith('1', updatePostDto);
      expect(result).toEqual({ ...mockPost, ...updatePostDto });
    });
  });

  describe('remove', () => {
    it('should delete an existing post', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when post does not exist', async () => {
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});