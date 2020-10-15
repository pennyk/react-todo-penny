import React from "react";
import "./styles.css";

const todos = [
  { id: "test1", value: "Pretend previous todo - Test 1", done: true },
  { id: "test2", value: "Pretend previous todo - Test 2", done: false }
];

export default function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <h2>Todo</h2>
      <TodoForm />
    </div>
  );
}

class TodoForm extends React.Component {
  constructor (props) {
    super(props);
    if(!this.state) {
      if(props && props.items) {
        this.state = { items: props.items };
      } 
    }
    if (!this.state || !this.state.items) {
      this.state = { items: todos }; // TODO: if todo list emptied, don't repopulate with defaults - add test
    }
    
    this.clearDone = this.clearDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearDone (event) {
    event.preventDefault();

    // get list of todo items
    let stateItems = ("items" in this.state) ? this.state.items : [];

    // remove todo items that have been marked done
    let updatedItems = stateItems.filter(function(item) {
      let domItem = document.getElementById(item.id.toString());
      return !domItem.checked;
    });

    // update todo list
    this.setState({ "items": updatedItems });
  }

  handleSubmit(event) {
    event.preventDefault();

    let value = event.target.querySelector("#todo input#item").value;
    let items = (this.props && this.props.items) ? this.props.items : [];
    if (items.length === 0) {
      items = (this.state && this.state.items) ? this.state.items : [];
    }

    // Validation
    if (value.trim() === "") {
      // empty todo items are rejected
      console.log("Warning: New todo item rejected - empty");
      return false;
    }
    let valueMatches = items.filter(function(item) {
      return value.toUpperCase() === item.value.toUpperCase();
    });
    if (valueMatches.length > 0) {
      // duplicate todo items are rejected
      console.log("Warning: New todo item rejected - duplicate");
      return false;
    }
    else if (valueMatches.length === 0) {
      // choose unique id based on timestamp
      let id = new Date().valueOf().toString();

      items = items.concat([{id: id, value: value, done: false}]);
      this.setState({ "items": items });
    }

  }

  render () {
    return (
      <form id="todo" onSubmit={this.handleSubmit}>
        <TodoList items={this.state.items} />
        <hr></hr>
        <input type="text" id="item" name="item" placeholder="Type new todo..." />
        <AddButton/>
        <button id="cleartodo" onClick={this.clearDone}>Clear done</button>
      </form>
    );
  }
}

class TodoList extends React.Component {
  render () {
    const items = (this.props.items) ? this.props.items : [];
    const listItems = items.map((item) => 
      <TodoItem key={item.id.toString()} item={item} />
    );
    return (
      <div className="todo-list">
        {listItems}
      </div>
    );
  }
}

class TodoItem extends React.Component {
  render () {
    const item = this.props.item;
    return (
      <div className="todo-item">
        {item.done ?
        <input type="checkbox" id={item.id} name={item.id} defaultChecked />
      : <input type="checkbox" id={item.id} name={item.id} />}
        <label htmlFor={item.id}>{item.value}</label>
      </div>
    );
  }
}

function AddButton () {
  return (
    <button id="addtodo" type="submit">Add</button>
  );
}
