import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name?: String;

    @IsString()
    @IsNotEmpty()
    lastname?: String;

    @IsString()
    @IsNotEmpty()
    phone?: String;

    image?: String;

    notification_token?: String;
}