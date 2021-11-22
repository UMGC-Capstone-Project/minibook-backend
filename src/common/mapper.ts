import { UserDto } from "src/common/dto/UserDto";
import { UserEntity } from "src/user/entities/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, displayname, email } = data;
    let userDto: UserDto = { id, displayname, email };
    return userDto;
}