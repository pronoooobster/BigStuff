export interface Task {
    task_id?: number;
    user_id?: string;
    task_name: string;
    deadline: string;
    reminder: boolean;
    priority: number;
}