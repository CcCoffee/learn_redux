import { call, put, takeLatest } from "redux-saga/effects";
import { fetchListViaHttp } from "../api";
import { FETCH_LIST } from "../store/actionTypes";
import { updateListAction, failFetchAction } from "../store/actionCreator";

// 单纯使用 redux 会不得不把网络请求代码放到 Component 中书写，产生耦合
// 使用 saga 可以将其分离到一个文件中，其余 reducer 方法保持不变
export function* fetchTodoList() {
  try {
    const response = yield call(fetchListViaHttp);
    if (response) {
      yield put(updateListAction(response.data));
    }
  } catch (error) {
    yield put(failFetchAction(error));
  }
}

export default function* mySaga() {
  yield takeLatest(FETCH_LIST, fetchTodoList);
}
