import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://localhost:' +
                process.env.DATABASE_PORT +
                '/' +
                process.env.DATABASE_NAME,
        ),
    ],
})
export class DatabaseModule {}
