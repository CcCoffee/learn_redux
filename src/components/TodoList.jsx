import React, { Component } from "react";
import store from "./store";
import {
  changeInputAction,
  addTodoItemAction,
  removeTodoItemAction,
  fetchTodoListAction,
} from "./store/actionCreator";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.onSubmit.bind(this);
    this.onInputChange.bind(this);
    this.removeItem.bind(this);
    this.storeChagne = this.storeChagne.bind(this);
    this.fetchListViaHttp.bind(this);
    // 订阅 store change 事件
    store.subscribe(this.storeChagne);
  }

  // 将store 的 state 与 组件的 state 绑定
  // 页面初始化时会发生一个 store change 事件
  storeChagne() {
    this.setState(store.getState());
  }

  onSubmit() {
    store.dispatch(addTodoItemAction());
  }

  onInputChange(e) {
    store.dispatch(changeInputAction(e));
  }

  removeItem(index) {
    store.dispatch(removeTodoItemAction(index));
  }

  async fetchListViaHttp() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ["Item 1", "Item 2"];
  }

  // 由于 redux 规定 reducer 中只能包含纯函数，副作用的代码写在了 Component 中
  componentDidMount() {
    this.fetchListViaHttp().then((resp) => {
      store.dispatch(fetchTodoListAction(resp));
    });
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.onInputChange(e)}
          />
          <button onClick={this.onSubmit}>Submit</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={index} onClick={() => this.removeItem(index)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
