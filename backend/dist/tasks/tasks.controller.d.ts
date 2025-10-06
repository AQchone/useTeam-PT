import { RealtimeGateway } from '../realtime/realtime.gateway';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    private readonly realtime;
    constructor(tasksService: TasksService, realtime: RealtimeGateway);
    findAll(): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./tasks.schema").Task, {}, {}> & import("./tasks.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    create(body: {
        title: string;
        description?: string;
        column?: 'todo' | 'doing' | 'done';
    }): Promise<import("mongoose").Document<unknown, {}, import("./tasks.schema").Task, {}, {}> & import("./tasks.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, body: Partial<{
        title: string;
        description: string;
        column: 'todo' | 'doing' | 'done';
    }>): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./tasks.schema").Task, {}, {}> & import("./tasks.schema").Task & {
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
