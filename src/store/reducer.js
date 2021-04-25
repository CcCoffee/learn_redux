import {
  CHANGE_INPUT,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  UPDATE_LIST,
} from "./actionTypes";

const defaultState = {
  inputValue: "Please input",
  list: [],
};

const reducer = (previousState = defaultState, action) => {
  if (action.type === CHANGE_INPUT) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.list.unshift(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }
  if (action.type === REMOVE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.list.splice(action.value, 1);
    return newState;
  }
  if (action.type === UPDATE_LIST) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.list = action.payload;
    return newState;
  }
  return previousState;
};

export default reducer;
