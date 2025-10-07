export declare class CreateTaskDto {
    title: string;
    description?: string;
    column?: 'todo' | 'doing' | 'done';
}
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    column?: 'todo' | 'doing' | 'done';
}
export declare class IdParamDto {
    id: string;
}
