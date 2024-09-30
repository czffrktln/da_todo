import { list, formatList, format, add, findByTitle, complete } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateSearchParams, validateCompleteParams } from './validate.js';

export function createApp(todoStore, args) {
  // const a = [1, 2, 3, 4]
  // const [ one, two, ...rest] = a
  // -> = [3, 4]
  const [, , command, ...params] = args;

  switch (command) {
    case 'list':
      const todos = list(todoStore)
      display([
        ...formatList(todos), 
        `You have ${todos.length} todos.`
      ]);
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)]);
      break;
    case 'find-by-title':
      const validatedSearchParam = validateSearchParams(params)
      const foundTodos = findByTitle(todoStore, validatedSearchParam);
      if (foundTodos.length === 0) {
        display(["NO MATCH"])
      } else {
        display(['Filtered todos:', ...formatList(foundTodos)])
      }
      break;
    case "complete":
      const validatedId = validateCompleteParams(params)
      const completedTodo = complete(todoStore, validatedId);
      display(['Your todo is completed', format(completedTodo)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
