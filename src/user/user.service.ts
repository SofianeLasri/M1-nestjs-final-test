import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async addUser(email: string): Promise<User> {
        const createdUser = new this.userModel({ email });
        return createdUser.save();
    }

    getUser(email: string): Promise<User | boolean> {
        return this.userModel.findOne({ email });
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({});
    }
}
