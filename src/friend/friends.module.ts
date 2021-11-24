import { Module } from '@nestjs/common';
import { FriendsController } from './controllers/friend.controller';
import { FriendsService } from './services/friend.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
