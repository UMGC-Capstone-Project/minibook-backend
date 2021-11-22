import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsPostEntity } from 'src/entity/news-post.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { FeedController } from './controllers/feed.controller';
import { FeedService } from './services/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPostEntity]), UsersModule],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {}
