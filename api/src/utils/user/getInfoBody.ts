import { CreateUserDto } from "../../dtos/user.dto";

export const getInfoUserOfBody = (body: any): CreateUserDto => {
    const { roleId, name, lastName, password, email, cellphone, phone, address } = body;
    const userDto: CreateUserDto = {
      roleId,
      name,
      lastName,
      password,
      email,
      cellphone,
      phone,
      address,
    };
    return userDto;
  }