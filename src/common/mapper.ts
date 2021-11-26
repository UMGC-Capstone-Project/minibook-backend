import { UserEntity } from '../user/entities/user.entity';
import { UserDto } from './dto/UserDto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, displayname, email, ...results } = data;
  const userDto: UserDto = { id, displayname, email, avatarUrl: buildImageUrl(results.avatar.key) };
  return userDto;
};

// TODO: Move out into its own helper function file...
function buildImageUrl(key: string): string {
  return `https://imgs.minibook.io/${key}`
}