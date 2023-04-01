import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { UserDocument } from "../interfaces/usuario.interface";
import userService from "../services/user.service";
import { encryptString } from "../utils/encrypt/encrypt";
import { createError } from "../utils/errors/createError";
