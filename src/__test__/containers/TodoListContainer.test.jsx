import React from "react";
import { shallow } from "enzyme";
import createSagaMiddleware from "redux-saga";
import configureMockStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import sagas from "../../store/sagas";

import {
  changeInputAction,
  addTodoItemAction,
  removeTodoItemAction,
  fetchTodoListAction,
  updateListAction,
} from "../../store/actionCreator";
import TodoListContainer from "../../containers/TodoListContainer";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "../../components/TodoList";

Enzyme.configure({ adapter: new Adapter() });

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

let mock = new MockAdapter(axios);

beforeAll(() => {
  mock.onGet("/todos").reply(200, ["起床", "吃饭", "坐地铁"]);
});
afterAll(() => {
  mock.restore();
});

describe("<TodoListContainer />", () => {
  let store;
  let enzymeWrapper;
  beforeEach(() => {
    // Initialize mockstore with empty state
    const initialState = {
      inputValue: "newItem",
      list: [],
    };
    store = mockStore(initialState);
    sagaMiddleware.run(sagas);
    enzymeWrapper = shallow(<TodoListContainer store={store} />);
  });

  it("should dispatch action", () => {
    // Dispatch the action
    store.dispatch(addTodoItemAction());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = addTodoItemAction();
    expect(actions).toEqual([expectedPayload]);
  });

  test("should render TodoList", () => {
    expect(enzymeWrapper.dive().dive().find(TodoList)).toHaveLength(1);
  });

  it("should dispatch fetchTodoList action", (done) => {
    store.subscribe(() => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedActions = [
        fetchTodoListAction(),
        updateListAction(["起床", "吃饭", "坐地铁"]),
      ];

      if (actions.length >= expectedActions.length) {
        // eslint-disable-next-line
        expect(actions).toEqual(expectedActions);
        done();
      }
    });

    // Dispatch the action
    store.dispatch(fetchTodoListAction());
  });

  test("Should dispatch fetchTodoList action from props maped from mapDispatchToProps", (done) => {
    store.subscribe(() => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedActions = [
        fetchTodoListAction(),
        updateListAction(["起床", "吃饭", "坐地铁"]),
      ];

      if (actions.length >= expectedActions.length) {
        // eslint-disable-next-line
        expect(actions).toEqual(expectedActions);
        done();
      }
    });
    enzymeWrapper.dive().props().fetchTodoList();
  });
});
