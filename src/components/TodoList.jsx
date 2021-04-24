import React, { Component } from "react";
import {
  changeInputAction,
  addTodoItemAction,
  removeTodoItemAction,
  fetchTodoListAction,
} from "../store/actionCreator";
import { connect } from "react-redux";

// 可以看到，使用了 react-redux 并不影响 redux-saga 等 redux 插件的编码方式
// 但是在本组件中消除了大量的模版代码，如在构造方法中绑定this和store.state，
// 登记 storeChange 事件处理方法等。
class TodoList extends Component {
  // 由于 redux 规定 reducer 中只能包含纯函数，副作用的代码写在了 Component 中
  componentDidMount() {
    this.props.fetchTodoList();
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <div>
          <input
            type="text"
            value={this.props.inputValue}
            onChange={(e) => this.props.onInputChange(e)}
          />
          <button onClick={this.props.onSubmit}>Submit</button>
        </div>
        <ul>
          {this.props.list.map((item, index) => (
            <li key={index} onClick={() => this.props.removeItem(index)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodoList: () => dispatch(fetchTodoListAction()),
    onSubmit: () => dispatch(addTodoItemAction()),
    onInputChange: (e) => dispatch(changeInputAction(e)),
    removeItem: (index) => dispatch(removeTodoItemAction(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
