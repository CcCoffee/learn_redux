import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoListContainer from "./containers/TodoListContainer";
import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <ul>
      <li>
        <Link to="/">TodoList</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    <hr />
    <Switch>
      <Route exact path="/">
        <Provider store={store}>
          <TodoListContainer />
        </Provider>
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
