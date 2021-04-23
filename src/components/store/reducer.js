import { CHANGE_INPUT, ADD_TODO_ITEM, REMOVE_TODO_ITEM } from "./actionTypes";

const initState = {
  inputValue: "Input item",
  list: ["test"],
};

const reducer = (previousState = initState, action) => {
  if (action.type === CHANGE_INPUT) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.list.unshift(newState.inputValue);
    return newState;
  }
  if (action.type === REMOVE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(previousState));
    newState.list.splice(action.value, 1);
    return newState;
  }
  return previousState;
};

export default reducer;
