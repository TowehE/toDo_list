import { Body, Controller, InternalServerErrorException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { createUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: createUserDto) {
        console.log(createUserDto);
        try {
            const createdUser = await this.usersService.createUser(createUserDto);
            return { message: 'User created successfully', user: createdUser };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user: ' + error.message);
        }
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        console.log(loginUserDto);
        try {
            const user = await this.usersService.loginUser(loginUserDto);
            return { message: 'Login successful', user };
        } catch (error) {
            throw new InternalServerErrorException('Failed to login: ' + error.message);
        }
    }
}
