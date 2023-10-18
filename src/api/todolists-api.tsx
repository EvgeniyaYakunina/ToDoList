import axios, {AxiosResponse} from "axios/index";

// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1',
//     withCredentials: true
// })
//
// export type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }
//
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
//
//
//
// export const  ToDoListAPI ={
//     // getTodolists() {
//     //     return  instance.get<TodolistType[]>('/todo-lists')
//     // },
//     // createTodolists(title:string){
//     //     return instance.post<ResponseType<{item:TodolistType}>>('/todo-lists', {title})
//     // },
//     // deleteTodolists(todolistId:string){
//     //     return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
//     // },
//     // updateTodolists(title: string, todolistId: string, ){
//     //     return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
//     // }
//
//     getTodolists() {
//         return instance.get<TodolistType[]>('todo-lists');
//     },
//     createTodolist(title: string) {
//         return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title});
//     },
//     deleteTodolist(id: string) {
//         return instance.delete<ResponseType>(`todo-lists/${id}`);
//     },
//     updateTodolist(id: string, title: string) {
//         return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title});
//     }
// }