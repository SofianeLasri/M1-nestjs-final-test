import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

    addTask(name: string, userId: string, priority: number): Promise<Task> {
        const createdTask = new this.taskModel({ name, userId, priority });
        return createdTask.save();
    }

    getTaskByName(name: string): Promise<Task | boolean> {
        return this.taskModel.findOne({ name });
    }

    getUserTasks(userId: string): Promise<Task[]> {
        return this.taskModel.find({ userId });
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({});
    }
}
