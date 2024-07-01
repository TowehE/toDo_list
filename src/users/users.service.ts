import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from "../schemas/User.schema";
import { Model } from "mongoose";
import { createUserDto } from "./dto/CreateUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";

Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

// createUser(createUserDto: createUserDto){
//     const newUser = new this.userModel(createUserDto)
//     return newUser.save()
    
// }

// }

async createUser(createUserDto: createUserDto): Promise<User> {
    const { userName, email, password } = createUserDto;

    const emailExists = await this.userModel.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const userNameExists = await this.userModel.findOne({ userName: userName.toLowerCase() });
    if (userNameExists) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new this.userModel({
      userName: userName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    return newUser;
  }


  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      throw new HttpException('User not verified yet', HttpStatus.FORBIDDEN);
    };

 
    return user;
  }

  
}


