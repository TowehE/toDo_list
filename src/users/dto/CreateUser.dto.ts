import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class createUserDto {
    @IsString()
    @IsNotEmpty()
    readonly userName: string;
    @IsString()

   @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
  @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}