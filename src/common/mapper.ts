import { buildImageUrl } from './utils';
import { UserEntity } from '../entities/user.entity';
import { AuthUserRegistrationResponse } from '../core/authentication/dto/auth-user-registration-response.dto';

export const toUserDto = (data: UserEntity): any => {
  const { id, displayname, email, firstname, lastname, ...results } = data;
  const imageKey = results.avatar?.key ? results.avatar.key : 'common/default-avatar.jpg';
  console.log('do we get called?')
  const userDto: any = {
    id,
    displayname,
    email,
    avatar: buildImageUrl(imageKey),
    firstname,
    lastname,
  };
  return userDto;
};

export const toUserFullDto = (data: UserEntity): any => {
  const { id, displayname, email, firstname, lastname, ...results } = data;
  const imageKey = results.avatar ? results.avatar.key : 'common/default-avatar.jpg';
  console.log('do we get called?')

  const userDto: any = {
    id,
    displayname,
    email,
    avatar: buildImageUrl(imageKey),
    firstname,
    lastname,
    posts: [
      {
        postId: '1',
        userId: id,
        displayName: displayname,
        message: 'message 1',
      },
      {
        postId: '2',
        userId: id,
        displayName: displayname,
        message: 'message 2',
      },
      {
        postId: '3',
        userId: id,
        displayName: displayname,
        message: 'message 3',
      }

    ],
    friends: []
  };
  return userDto;
};

export const toAvatarDto = (data: any): any => {
  const { id, key, url } = data;
  return {
    success: true,
    url: buildImageUrl(key),
  };
};


export const toUserRegistrationResponseDto = (data: UserEntity): AuthUserRegistrationResponse => {
  const { id, email, displayname } = data;
  return {
    userId: id,
    email: email,
    displayname: displayname,
  }
}