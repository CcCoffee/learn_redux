import React from "react";

// 可以看到，使用了 react-redux 并不影响 redux-saga 等 redux 插件的编码方式
// 但是在本组件中消除了大量的模版代码，如在构造方法中绑定this和store.state，
// 登记 storeChange 事件处理方法等。
const TodoListUI = ({
  inputValue,
  list,
  onSubmit,
  onInputChange,
  removeItem,
}) => {
  return (
    <div style={{ margin: 10 }}>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e)}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index} onClick={() => removeItem(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListUI;
