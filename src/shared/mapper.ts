import { UserDto } from "src/dto/UserDto";
import { UserEntity } from "src/entity/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {
    const {id, displayname, email} = data;
    let userDto: UserDto = { id, displayname, email};
    return userDto;
}