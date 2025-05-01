require('tsconfig-paths/register');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { PostComment } from './comments/entities/comment.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const commentRepo = dataSource.getRepository(PostComment);

  console.log('Clearing existing data...');
  await commentRepo.delete({});
  await postRepo.delete({});
  await userRepo.delete({});

  console.log('Creating users...');
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const user = userRepo.create({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: await bcrypt.hash('123456', 10),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 60 }),
      gender: faker.person.sexType(),
      address: faker.location.streetAddress(),
      website: faker.internet.url(),
    });
    users.push(await userRepo.save(user));
  }

  console.log('Creating posts...');
  const posts: Post[] = [];
  for (const user of users) {
    for (let i = 0; i < 2; i++) {
      const post = postRepo.create({
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(2),
        body: faker.lorem.paragraphs(3),
        user,
      });
      posts.push(await postRepo.save(post));
    }
  }

  console.log('Creating comments...');
  for (const post of posts) {
    for (let i = 0; i < 3; i++) {
      const comment = commentRepo.create({
        message: faker.lorem.sentences(2),
        user: faker.helpers.arrayElement(users),
        post,
      });
      await commentRepo.save(comment);
    }
  }

  console.log('✅ Seeding complete.');
  await app.close();
}

seed();
