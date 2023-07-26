import {v1} from "uuid";
import {TasksStateType} from "../App";
import {useState} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(()=>{
     startState = {
        "todoListId1": [
            {id: "1", title: "Friends", isDone: true},
            {id: "2", title: "Ted Lasso", isDone: true},
            {id: "3", title: "Mandalorian", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Pizza", isDone: true},
            {id: "2", title: "Cola", isDone: false},
            {id: "3", title: "Tea", isDone: false}
        ]
    }
})

test('correct tasks should be deleted from correct array', () => {

    // const startState: TasksStateType = {
    //     "todoListId1": [
    //         {id: "1", title: "Friends", isDone: true},
    //         {id: "2", title: "Ted Lasso", isDone: true},
    //         {id: "3", title: "Mandalorian", isDone: false}
    //     ],
    //     "todoListId2": [
    //         {id: "1", title: "Pizza", isDone: true},
    //         {id: "2", title: "Cola", isDone: false},
    //         {id: "3", title: "Tea", isDone: false}
    //     ]
    // }

    const action = removeTaskAC("2", "todoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"].every(t=> t.id !== "2")).toBeTruthy();
    expect(endState["todoListId2"][0].id).toBe("1");
    expect(endState["todoListId2"][1].id).toBe("3");
})

test('correct task should be added to correct array', () => {
    // const startState: TasksStateType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = addTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    // const startState: TasksStateType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBeTruthy();
    expect(endState['todolistId1'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId2'][1].isDone).toBeFalsy();
})

test('title of specified task should be changed', () => {
    // const startState: TasksStateType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }
    const action = changeTaskTitleAC('2', 'bread', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('bread');
})

test('new property with new array should be added when new todolist is added', () => {
    // const startState: TasksStateType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    // const startState: TasksStateType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
