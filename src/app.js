import { list, formatList, format, add } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams } from './validate.js';

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
      display(['New Todo added:', format(added)])
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
