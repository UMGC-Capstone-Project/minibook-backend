import { UserEntity } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/UserResponseDto';
import { buildImageUrl } from './utils';

export const toUserDto = (data: UserEntity): UserResponseDto => {
  const { id, displayname, email, ...results } = data;
  const imageKey = results.avatar?.key ? results.avatar.key : 'common/default-avatar.jpg'
  const userDto: UserResponseDto = {
    id,
    displayname,
    email,
    avatarUrl: buildImageUrl(imageKey),
  };
  return userDto;
};
