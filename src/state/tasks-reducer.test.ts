import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "Pizza", status: TaskStatuses.New, todoListId: "todoListId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "bread", status: TaskStatuses.Completed, todoListId: "todoListId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "Tea", status: TaskStatuses.New, todoListId: "todoListId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test('correct tasks should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"].every(t => t.id !== "2")).toBeTruthy();
    expect(endState["todoListId2"][0].id).toBe("1");
    expect(endState["todoListId2"][1].id).toBe("3");
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: "10",
        title: "juce",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "", order: 0, priority: TaskPriorities.Low
    }, 'todoListId2');

    const endState = tasksReducer(startState, action)
    console.log(endState)
    expect(endState['todoListId1']?.length).toBe(3);
    expect(endState['todoListId2']?.length).toBe(4);
    expect(endState['todoListId2'][0].id).toBeDefined();
    expect(endState['todoListId2'][0].title).toBe('juce')
    expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todoListId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].status).toBe(TaskStatuses.New);
    expect(endState['todoListId1'][1].status).toBe(TaskStatuses.New);
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC('2', {title: 'bread'}, 'todoListId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].title).toBe('bread');
})

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: "new id",
        title: "new todolist",
        order: 0,
        addedDate: ''
    });
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todoListId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).toBeUndefined()
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        { id: "1", title: "title 1", order: 0, addedDate: ""},
        { id: "2", title: "title 2", order: 0, addedDate: ""}
    ])
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState["todoListId1"], "todoListId1");

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": []
    }, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(0)
})


