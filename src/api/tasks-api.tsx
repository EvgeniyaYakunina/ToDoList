import axios, {AxiosResponse} from "axios/index";
//
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     withCredentials: true
// })
//
// export type TaskType={
//     description: string
//     title: string
//     status: TaskStatuses
//     priority: number
//     deadline: string
//     id: string
//     startDate: string
//     todoListId: string
//     order: number
//     addedDate: string
//
// }
//
// export enum TaskStatuses {
//     New = 0,
//     InProgress = 1,
//     Completed = 2,
//     Draft = 3
// }
//
// export enum TaskPriorities {
//     Low = 0,
//     Middle = 1,
//     Hi = 2,
//     Urgently = 3,
//     Later = 4
// }
//
// type GetTasksResponse={
//     error: string | null
//     totalCount: number
//     items: TaskType[]
// }
//
// export type UpdateTaskModelType={
//     title: string
//     description: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
// }
//
// type ResponseType<T = {}>={
//     resultCode: number
//     messages: string[],
//     data: T
// }
//
// const instanceTask = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
//     withCredentials: true
// })
//
// export const TaskAPI ={
//     // getTasks(todolistId: string){
//     //     return instanceTask.get<GetTasksResponse>(`${todolistId}/tasks`)
//     // },
//     // createTask(todolistId:string, title: string){
//     //     return instanceTask.post<ResponseType<TaskType>>(`${todolistId}/tasks/`, {title})
//     // },
//     // deleteTask(todolistId:string, taskId:string){
//     //     return instanceTask.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
//     // },
//     // updateTask(todolistId:string, taskId: string, model: UpdateTaskModelType){
//     //     return instanceTask.put<ResponseType>(`${todolistId}/tasks/${taskId}`, {model})
//     // }
//
//     getTasks(todolistId: string) {
//         return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
//     },
//     deleteTask(todolistId: string, taskId: string) {
//         return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
//     },
//     createTask(todolistId: string, title: string) {
//         return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title});
//     },
//     updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
//         return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
//     }
// }