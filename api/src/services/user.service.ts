import { CreateUserDto, QueryUserDto, UpdateUserDto } from "../dtos/user.dto";
import { UserDocument, WhereUser } from "../interfaces/usuario.interface";
import UserModel from "../models/user.model";

type ReturnFindUser = Promise<UserDocument | UserDocument[]>;

class UserService {
  async deleteUser(id: string): Promise<UserDocument> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (err: any) {
      throw new Error(`Error deleting user: ${err.message}`);
    }
  }

  async updateUser(
    id: string,
    updateUser: UpdateUserDto
  ): Promise<UserDocument> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateUser, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (err: any) {
      throw new Error(`Error updating user: ${err.message}`);
    }
  }

  async getUsers(query: QueryUserDto = {}): Promise<UserDocument[]> {
    try {
      const users = await UserModel.find(query);
      return users;
    } catch (err: any) {
      throw new Error(`Error finding users: ${err.message}`);
    }
  }

  async findUser(where: WhereUser): ReturnFindUser {
    try {
      const users: UserDocument[] = await UserModel.find(where);
      if (users.length === 0) {
        throw new Error("User not found");
      }
      if (users.length === 1) {
        return users[0];
      }
      return users;
    } catch (err: any) {
      throw new Error(`Error finding user: ${err.message}`);
    }
  }

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = new UserModel(userDto);
      const savedUser = await user.save();
      return savedUser;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

const userService = new UserService();

export default userService;
