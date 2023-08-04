import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodoListsType} from '../AppWithRedux'

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListsType>

beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: 'What to watch', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    // let todoListId1 = v1()
    // let todoListId2 = v1()
    //
    // const startState: Array<TodoListsType> = [
    //     {id: todoListId1, title: 'What to learn', filter: 'all'},
    //     {id: todoListId2, title: 'What to buy', filter: 'all'}
    // ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    // const startState: Array<TodoListsType> = [
    //     {id: todolistId1, title: "What to watch", filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to watch")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    // const startState: Array<TodoListsType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ]

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

