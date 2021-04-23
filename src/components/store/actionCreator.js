import {
  CHANGE_INPUT,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  FETCH_LIST,
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

export const fetchTodoListAction = (list) => ({
  type: FETCH_LIST,
  value: list,
});
