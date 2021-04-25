import React, { Component } from "react";
import {
  changeInputAction,
  addTodoItemAction,
  removeTodoItemAction,
  fetchTodoListAction,
} from "../store/actionCreator";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";

// 可以看到，使用了 react-redux 并不影响 redux-saga 等 redux 插件的编码方式
// 但是在本组件中消除了大量的模版代码，如在构造方法中绑定this和store.state，
// 登记 storeChange 事件处理方法等。
class TodoListContainer extends Component {
  // 由于 redux 规定 reducer 中只能包含纯函数，副作用的代码写在了 Component 中
  componentDidMount() {
    this.props.fetchTodoList();
  }

  render() {
    return <TodoList {...this.props} />;
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

// connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，
// 然后通过connect再链接到一起，让代码更加清晰和易于维护。这也是React-Redux最大的优点。
export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
