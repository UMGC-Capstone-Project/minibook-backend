import { UserEntity } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/UserResponseDto';
import { buildImageUrl } from './utils';
import { AvatarRequestDto } from '../user/dto/AvatarRequestDto';
import { AvatarResponseDto } from '../user/dto/AvatarResponseDto';

export const toUserDto = (data: UserEntity): UserResponseDto => {
  const { id, displayname, email, firstname, lastname, ...results } = data;
  const imageKey = results.avatar?.key ? results.avatar.key : 'common/default-avatar.jpg';
  console.log('do we get called?')
  const userDto: UserResponseDto = {
    id,
    displayname,
    email,
    avatar: buildImageUrl(imageKey),
    firstname,
    lastname,
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
