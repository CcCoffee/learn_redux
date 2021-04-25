import React from "react";
import { shallow } from "enzyme";
import createSagaMiddleware from "redux-saga";
import configureMockStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "../../components/TodoList";
import sagas from "../../store/sagas";
import TodoListContainer from "../../containers/TodoListContainer";
import {
  changeInputAction,
  addTodoItemAction,
  removeTodoItemAction,
  fetchTodoListAction,
  updateListAction,
} from "../../store/actionCreator";

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

// 容器组件主要测试
// 1. 是否能够渲染子组件
// 2. 能否成功分发事件，这里并不测试reducer 方法和 sagas 方法，将进行单独测试
describe("<TodoListContainer />", () => {
  let store;
  let enzymeWrapper;
  const initialState = {
    inputValue: "newItem",
    list: [],
  };
  beforeEach(() => {
    // Initialize mockstore with empty state
    store = mockStore(initialState);
    sagaMiddleware.run(sagas);
    enzymeWrapper = shallow(<TodoListContainer store={store} />);
  });

  // Because connect method of react-redux library is again an HOC which
  // uses React’s Context API internally so we have to call dive to get 1 level deeper
  test("should render TodoList", () => {
    expect(enzymeWrapper.dive().dive().find(TodoList)).toHaveLength(1);
  });

  // As the redux-mock-store library does not update the store,
  // so we have to assert the dispatched actions only
  // and not the modified state after dispatching the actions
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

  // Actually this case is as same as above one
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

  it("should dispatch onSubmit action", () => {
    // Dispatch the action
    store.dispatch(addTodoItemAction());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedActions = [addTodoItemAction()];
    expect(actions).toEqual(expectedActions);
  });

  // Actually this case is as same as above one
  test("Should dispatch onSubmit action from props maped from mapDispatchToProps", (done) => {
    store.subscribe(() => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedActions = [addTodoItemAction()];

      if (actions.length >= expectedActions.length) {
        // eslint-disable-next-line
        expect(actions).toEqual(expectedActions);
        done();
      }
    });
    enzymeWrapper.dive().props().onSubmit();
  });

  test("Should dispatch removeTodoItem action from props maped from mapDispatchToProps", (done) => {
    store.subscribe(() => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedActions = [removeTodoItemAction()];

      if (actions.length >= expectedActions.length) {
        // eslint-disable-next-line
        expect(actions).toEqual(expectedActions);
        done();
      }
    });
    enzymeWrapper.dive().props().removeItem();
  });

  test("Should dispatch changeInput action from props maped from mapDispatchToProps", (done) => {
    const event = { target: { value: initialState.inputValue } };
    store.subscribe(() => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedActions = [changeInputAction(event)];

      if (actions.length >= expectedActions.length) {
        // eslint-disable-next-line
        expect(actions).toEqual(expectedActions);
        done();
      }
    });
    enzymeWrapper.dive().props().onInputChange(event);
  });
});
