import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, ref: 'User' })
    userId: string;

    @Prop({ required: true })
    priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        ret.id = doc._id;
    },
});
