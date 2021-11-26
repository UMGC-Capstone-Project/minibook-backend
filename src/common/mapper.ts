import { UserEntity } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/UserResponseDto';

export const toUserDto = (data: UserEntity): UserResponseDto => {
  const { id, displayname, email, ...results } = data;
  const userDto: UserResponseDto = {
    id,
    displayname,
    email,
    avatarUrl: buildImageUrl(results.avatar.key),
  };
  return userDto;
};

// TODO: Move out into its own helper function file...
function buildImageUrl(key: string): string {
  return `https://imgs.minibook.io/${key}`;
}
