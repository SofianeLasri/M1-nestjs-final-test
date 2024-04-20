import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import { Task } from './task.schema';
import { Types as MongooseTypes } from 'mongoose';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const { name, userId, priority } = createTaskDto;

        if (
            !name ||
            !userId ||
            !priority ||
            !MongooseTypes.ObjectId.isValid(userId) ||
            isNaN(priority)
        ) {
            throw new BadRequestException('All fields are required');
        }

        return this.taskService.addTask(name, userId, priority);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (!userId || !MongooseTypes.ObjectId.isValid(userId)) {
            throw new BadRequestException('A valid userId is required');
        }

        const tasks = await this.taskService.getUserTasks(userId);

        if (!tasks) {
            throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
        }

        return tasks;
    }
}
