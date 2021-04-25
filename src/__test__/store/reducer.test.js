import reducer from "../../store/reducer";
import {
  CHANGE_INPUT,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  UPDATE_LIST,
} from "../../store/actionTypes";

const defaultState = {
  inputValue: "Please input",
  list: [],
};

describe("Reducer", () => {
  test("should return default state when state is not undefined", () => {
    expect(reducer(undefined, { type: "DUMMY_ACTION" })).toEqual(defaultState);
  });

  test("should return expected state for CHANGE_INPUT action type and specific state", () => {
    const previousState = {
      inputValue: "Please input",
      list: [],
    };
    const action = {
      type: CHANGE_INPUT,
      value: "New Item",
    };
    const expectedState = {
      inputValue: "New Item",
      list: [],
    };
    expect(reducer(previousState, action)).toEqual(expectedState);
  });

  test("should return expected state for ADD_TODO_ITEM action type and specific state", () => {
    const previousState = {
      inputValue: "New Item",
      list: [],
    };
    const action = {
      type: ADD_TODO_ITEM,
    };
    const expectedState = {
      inputValue: "",
      list: ["New Item"],
    };
    expect(reducer(previousState, action)).toEqual(expectedState);
  });

  test("should return expected state for REMOVE_TODO_ITEM action type and specific state", () => {
    const previousState = {
      inputValue: "",
      list: ["Item 1", "Item 2", "Item 3"],
    };
    const action = {
      type: REMOVE_TODO_ITEM,
      value: 1,
    };
    const expectedState = {
      inputValue: "",
      list: ["Item 1", "Item 3"],
    };
    expect(reducer(previousState, action)).toEqual(expectedState);
  });

  test("should return expected state for UPDATE_LIST action type and specific state", () => {
    const previousState = {
      inputValue: "",
      list: [],
    };
    const action = {
      type: UPDATE_LIST,
      payload: ["Item 1", "Item 2", "Item 3"],
    };
    const expectedState = {
      inputValue: "",
      list: ["Item 1", "Item 2", "Item 3"],
    };
    expect(reducer(previousState, action)).toEqual(expectedState);
  });
});
