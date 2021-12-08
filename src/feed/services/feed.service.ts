import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from '../../user/dto/UserResponseDto';
import { UsersService } from '../../user/services/users.service';
import { Repository } from 'typeorm';
import { NewsPostEntity } from '../entities/news-post.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(NewsPostEntity)
    private readonly newsPostRepository: Repository<NewsPostEntity>,
    private readonly userService: UsersService,
  ) {}

  async create(
    newsPost: NewsPostEntity,
    user: any,
  ): Promise<NewsPostEntity> {
    const post = await this.newsPostRepository.create({
      author: { id: user.userId },
      body: newsPost.body,
    });
    const results = await this.newsPostRepository.save(post);
    return results;
  }

  async findById(id: number) {
    return await this.newsPostRepository.findOne({ where: { id: id } });
  }

  async findByAuthor(id: number) {
    return await this.newsPostRepository.find({ where: { author: id } });
  }

  async update(id: number, postUpdate: any) {
    return await this.newsPostRepository.update(id, postUpdate);
  }

  async delete(id: number) {
    return await this.newsPostRepository.delete(id);
  }
}
