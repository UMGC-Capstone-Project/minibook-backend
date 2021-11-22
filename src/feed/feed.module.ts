import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { FeedController } from './controllers/feed.controller';
import { NewsPostEntity } from './entities/news-post.entity';
import { FeedService } from './services/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPostEntity]), UsersModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
