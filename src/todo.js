import { AppError } from "./app-error.js";

export function format(todo) {
  return `${todo.id} - [${todo.done ? '✅': ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format)
}

function nextId(todos) {
  const ids = todos.map(todo => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get(); 
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get()
  const newTodo = {
    title,
    done: false,
    id: nextId(todos)
  }
  const toStore = [...todos, newTodo]
  store.set(toStore)
  return newTodo;
}

export function findByTitle(store, params) {
  const [searchParam] = params;
  const todos = store.get()
  // const filteredTodos = todos.filter(t => t.title.match(new RegExp(searchParam, "i")))
  const filteredTodos = todos.filter(t => t.title.toLowerCase().match(searchParam.toLowerCase()))
  return filteredTodos;
}

function findTodoById(todos, id) {
  return todos.find( t => t.id === id)
}

export function complete(store, id) {
  const todos = store.get()
  const todo = findTodoById(todos, id)

  if (!todo) {
    throw new AppError('There is no Todo with this ID.')
  }

  const completedTodo = {...todo, done : true}

  const modifiedTodos = todos.map( t => 
    t.id === id ? completedTodo : t
  )

  store.set(modifiedTodos)
  
  return completedTodo
}