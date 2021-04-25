import { call, put } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchTodoList } from "../../store/sagas";
import { fetchListViaHttp } from "../../api";
import { failFetchAction, updateListAction } from "../../store/actionCreator";
import reducer from "../../store/reducer";

describe("Sagas", () => {
  it("fetchTodoList - version 1 with mock API response by itself", () => {
    const gen = fetchTodoList();
    let next = gen.next();
    expect(next.value).toEqual(call(fetchListViaHttp));
    const mockResponse = { data: ["item 1", "item 2"] };
    next = gen.next(mockResponse);
    expect(next.value).toEqual(put(updateListAction(["item 1", "item 2"])));
    next = gen.next();
    expect(next.done).toEqual(true);
  });

  it("fetchTodoList - version 2 with mock API response by itself", () => {
    const mockResponse = { data: ["item 1", "item 2"] };
    testSaga(fetchTodoList)
      .next()
      .call(fetchListViaHttp)
      .next(mockResponse)
      .put(updateListAction(["item 1", "item 2"]))
      .next()
      .isDone();
  });

  it("fetchTodoList - version 3 with mock API response by axios-mock-adapter", () => {
    let mock = new MockAdapter(axios);
    mock.onGet("/todos").reply(200, ["起床", "吃饭", "坐地铁"]);

    try {
      return (
        expectSaga(fetchTodoList)
          .withReducer(reducer)
          // Assert that the `put` will eventually happen.
          .put(updateListAction(["起床", "吃饭", "坐地铁"]))
          // Start the test. Returns a Promise.
          .hasFinalState({
            inputValue: "Please input",
            list: ["起床", "吃饭", "坐地铁"],
          })
          .run()
      );
    } finally {
      mock.restore();
    }
  });

  it("fetchTodoList - version 4 with mock API response by provider", () => {
    const mockResponse = { data: ["起床", "吃饭", "坐地铁"] };
    return (
      expectSaga(fetchTodoList)
        .provide([[matchers.call.fn(fetchListViaHttp), mockResponse]])
        .withReducer(reducer)
        // Assert that the `put` will eventually happen.
        .put(updateListAction(["起床", "吃饭", "坐地铁"]))
        // Start the test. Returns a Promise.
        .hasFinalState({
          inputValue: "Please input",
          list: ["起床", "吃饭", "坐地铁"],
        })
        .run()
    );
  });

  it("fetchTodoList error handling", () => {
    const error = new Error("error");
    return expectSaga(fetchTodoList)
      .provide([[matchers.call.fn(fetchListViaHttp), throwError(error)]])
      .put(failFetchAction(error))
      .run();
  });
});
