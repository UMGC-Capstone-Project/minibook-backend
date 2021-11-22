import { UserEntity } from "../user/entities/user.entity";
import { UserDto } from "./dto/UserDto";


export const toUserDto = (data: UserEntity): UserDto => {
    const { id, displayname, email } = data;
    let userDto: UserDto = { id, displayname, email };
    return userDto;
}