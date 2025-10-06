import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';
export declare class TasksService {
    private readonly taskModel;
    constructor(taskModel: Model<TaskDocument>);
    create(data: Pick<Task, 'title' | 'description' | 'column'>): Promise<import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    update(id: string, data: Partial<Pick<Task, 'title' | 'description' | 'column'>>): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
