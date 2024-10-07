import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateSearchParams(params) {
  const [searchParam] = params
  if (searchParam.length < 3) {
    throw new AppError("You should type at least 3 characters!")
  }
  return params
}

export function validateCompleteParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give one, and only one ID please!');
  }
  const [id] = params;

  if (!(/^\d+$/.test(id))) {
    throw new AppError('The ID must be a number.')
  }
  return +params;
}