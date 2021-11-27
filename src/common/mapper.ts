import { UserEntity } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/UserResponseDto';
import { buildImageUrl } from './utils';
import { AvatarRequestDto } from '../user/dto/AvatarRequestDto';
import { AvatarResponseDto } from '../user/dto/AvatarResponseDto';

export const toUserDto = (data: UserEntity): UserResponseDto => {
  const { id, displayname, email, ...results } = data;
  const imageKey = results.avatar?.key
    ? results.avatar.key
    : 'common/default-avatar.jpg';
  const userDto: UserResponseDto = {
    id,
    displayname,
    email,
    avatarUrl: buildImageUrl(imageKey),
  };
  return userDto;
};

export const toAvatarDto = (data: AvatarRequestDto): AvatarResponseDto => {
  const { id, key, url } = data;
  return {
    success: true,
    url: buildImageUrl(key),
  };
};
