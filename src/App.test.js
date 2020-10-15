import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
let jsdom = require("mocha-jsdom");

global.document = jsdom({
  url: "http://localhost:3000/"
});

import App from "./App";

let rootContainer;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe("Render Testing", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Renders Todo App H1 Title", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const h1 = rootContainer.querySelector("h1");
    expect(h1.textContent).to.equal("Todo App");
  });
  it("Renders Todo H2 Title", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const h2 = rootContainer.querySelector("h2");
    expect(h2.textContent).to.equal("Todo");
  });
  it("Renders Todo Form", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const form = rootContainer.querySelector("form#todo");
    expect(form).to.exist;
  });
  it("Renders Todo List", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const list = rootContainer.querySelector("div.todo-list");
    expect(list).to.exist;
  });
  it("Renders Todo Text Field", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const field = rootContainer.querySelector("#item");
    expect(field).to.exist;
    expect(field.getAttribute("placeholder")).to.equal("Type new todo...");
  });
  it("Renders Add Button", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    expect(button).to.exist;
  });
  it("Renders Clear Done Button", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#cleartodo");
    expect(button).to.exist;
  });
});

describe("Add Function Testing", () => {
  it("Adds unique todo item to list (when list already has items)", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    const field = rootContainer.querySelector("#item");
    // get original count of todo list items
    const list = rootContainer.querySelectorAll("div.todo-item");
    expect(list.length).to.equal(2);
    // add todo item
    field.value="Unique todo item";
    button.click();
    const list2 = rootContainer.querySelectorAll("div.todo-item");
    expect(list2.length).to.equal(3);
  });
  it.skip("Adds unique todo item to list (when list has 0 items)", () => {
    const items = [];
    act(() => {
      // Not implemented: <App todos={items} />
      ReactDOM.render(<App todos={items} />, rootContainer);
    });
    //const element = rootContainer.querySelector("h1");
    //expect(element.textContent).to.equal("Todo App");
  });
  it("Does not add todo item when text field is empty", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    const field = rootContainer.querySelector("#item");

    // get original count of todo list items
    const list = rootContainer.querySelectorAll("div.todo-item");
    expect(list.length).to.equal(2);

    // add todo item
    field.value="";
    button.click();

    const list2 = rootContainer.querySelectorAll("div.todo-item");
    expect(list2.length).to.equal(2);
  });
  it("Does not add todo item when text field contains only whitespace", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    const field = rootContainer.querySelector("#item");

    // get original count of todo list items
    const list = rootContainer.querySelectorAll("div.todo-item");
    console.log("list", list);
    expect(list.length).to.equal(2);

    // add todo item
    field.value="   ";
    button.click();
    const list2 = rootContainer.querySelectorAll("div.todo-item");
    expect(list2.length).to.equal(2);
  });
  it("Does not add todo item when it is a duplicate (matching case)", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    const field = rootContainer.querySelector("#item");
    const value = "todo item";

    // add todo item
    field.value = value;
    button.click();

    // get count of todo list items before duplicate added
    const list = rootContainer.querySelectorAll("div.todo-item");
    const index = list.length-1;
    expect(list.length).to.be.gte(1);

    // expect first new item added to exist
    expect(list[index].querySelector("label").textContent).to.equal(value);

    // add duplicate todo item
    field.value = value;
    button.click();

    const list2 = rootContainer.querySelectorAll("div.todo-item");
    expect(list2.length).to.equal(list.length);
  });
  it("Does not add todo item when it is a duplicate (even when case does not match)", () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const button = rootContainer.querySelector("#addtodo");
    const field = rootContainer.querySelector("#item");
    const value = "todo item";
    const value2 = "Todo Item";

    // add todo item
    field.value = value;
    button.click();

    // get count of todo list items before duplicate added
    const list = rootContainer.querySelectorAll("div.todo-item");
    const index = list.length-1;
    expect(list.length).to.be.gte(1);

    // expect first new item added to exist
    expect(list[index].querySelector("label").textContent).to.equal(value);

    // add duplicate todo item
    field.value = value2;
    button.click();
    
    const list2 = rootContainer.querySelectorAll("div.todo-item");
    expect(list2.length).to.equal(list.length);
  });
});

// describe("Clear Function Testing", () => {
//   it.skip("___", () => {
//     act(() => {
//       ReactDOM.render(<App />, rootContainer);
//     });
//     const h1 = rootContainer.querySelector("h1");
//     expect(h1.textContent).to.equal("Todo App");
//   });

//   // Does not clear when no todo items selected
//   // Clears correct item when first item selected
//   // Clears correct item when middle item selected
//   // Clears correct item when last item selected
//   // Can still add a todo item after clear done used
// });
