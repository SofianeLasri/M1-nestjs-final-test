import {
    BadRequestException,
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.schema';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!createUserDto.email || !emailRegex.test(createUserDto.email)) {
            // 400 Bad Request
            throw new BadRequestException('A valid email is required');
        }

        const isUserAlreadyExists: User | boolean =
            await this.userService.getUser(createUserDto.email);

        if (isUserAlreadyExists) {
            // 409 Conflict
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        return this.userService.addUser(createUserDto.email);
    }
}
