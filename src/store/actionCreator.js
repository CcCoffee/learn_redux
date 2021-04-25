import {
  CHANGE_INPUT,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  FETCH_LIST,
  UPDATE_LIST,
  FAIL_FETCH,
} from "./actionTypes";

export const changeInputAction = (e) => ({
  type: CHANGE_INPUT,
  value: e.target.value,
});

export const addTodoItemAction = () => ({
  type: ADD_TODO_ITEM,
});

export const removeTodoItemAction = (index) => ({
  type: REMOVE_TODO_ITEM,
  value: index,
});

export const fetchTodoListAction = () => ({
  type: FETCH_LIST,
});

export const updateListAction = (list) => ({
  type: UPDATE_LIST,
  payload: list,
});

export const failFetchAction = (error) => ({
  type: FAIL_FETCH,
  payload: error.message,
});
