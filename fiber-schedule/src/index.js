import React from "./react";
import { render } from "./react-dom";

const root = React.createElement(
  "div",
  {
    className: "container"
  },
  "A1",
  React.createElement(
    "div",
    null,
    "B1",
    React.createElement("div", null, "C1"),
    React.createElement("div", null, "C2")
  ),
  React.createElement(
    "div",
    null,
    "B2",
    React.createElement("div", null, "D1"),
    React.createElement("div", null, "D2")
  )
);

render(root, document.getElementById("root"));
