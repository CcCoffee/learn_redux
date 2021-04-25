import React from "react";
import TodoList from "../../components/TodoList";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
  inputValue: "Please input",
  list: ["exisiting item"],
  onSubmit: jest.fn(),
  onInputChange: jest.fn(),
  removeItem: jest.fn(),
};
const enzymeWrapper = shallow(<TodoList {...props} />);

// 纯函数组件中主要测试用户行为（如 click 事件）是否能触发 props 中的各个事件处理器方法
describe("<TodoList />", () => {
  test("should render 1 button tag", () => {
    expect(enzymeWrapper.find("button")).toHaveLength(1);
  });

  test("should render 1 li tag with content 'exisiting item'", () => {
    expect(enzymeWrapper.find("li")).toHaveLength(1);
    expect(enzymeWrapper.find("li").text()).toBe("exisiting item");
  });

  test("should call onSubmit on clicking the 'submit' button", () => {
    enzymeWrapper.find("button").simulate("click");
    expect(props.onSubmit).toBeCalledTimes(1);
  });

  test("should call removeItem on clicking todo list item", () => {
    enzymeWrapper.find("li").simulate("click");
    expect(props.removeItem).toBeCalledWith(0);
  });

  test("should call onInputChange on input value", () => {
    const event = { target: { value: "spam" } };
    enzymeWrapper.find("input").simulate("change", event);
    expect(props.onInputChange).toBeCalledWith(event);
  });
});
