import * as React from "react";
import { render } from "react-dom";
import './style.css';
import Hello from "./Hello";

const App = () => (
  <div className="content">
    <Hello title="GiphyTooltip demo" />
  </div>
);

render(<App />, document.getElementById("root"));