import React from "react";
import "./styles.css";

const todos = [
  { id: "test1", value: "Pretend previous todo - Test 1" },
  { id: "test2", value: "Pretend previous todo - Test 2" }
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
    let items = document.querySelectorAll('#todo input[type="checkbox"]');
    // TODO: make sure DOM and this.state are in sync
    if (items) {
      for (let i = 0; i < items.length; i++) {
        // remove todo items marked as done
        if (items[i].checked) {
          items[i].parentNode.remove();
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("handleSubmit", event.target, "state", this.state, "props", this.props);
    let value = event.target.querySelector("#todo input#item").value;
    // choose unique id based on timestamp
    let id = new Date().valueOf().toString();
    let items = (this.props && this.props.items) ? this.props.items : [];
    if (items.length === 0) {
      items = (this.state && this.state.items) ? this.state.items : [];
    }
    items = items.concat([{id: id, value: value}]);
    this.setState({ "items": items });
    console.log("NEW items", items.length, id, value);
  }

  render () {
    console.log("TodoForm.render", "state items", this.state.items.length, "props", this.props);

    return (
      <form id="todo" onSubmit={this.handleSubmit}>
        <TodoList items={this.state.items} />
        <hr></hr>
        <input type="text" id="item" name="item" />
        <AddButton/>
        <button id="cleartodo" onClick={this.clearDone}>Clear done</button>
      </form>
    );
  }
}

class TodoList extends React.Component {
  constructor (props) {
    super(props);
    let items = [];
    if (props.items) {
      items = props.items;
    }

    console.log('TL props', props, ' items', items);

  }

  render () {
    console.log("TodoList.render", this.state, this.props);
    let items = (this.props.items) ? this.props.items : [];
    
    let listItems = items.map((item) => 
      <TodoItem key={item.id.toString()} id={item.id.toString()} value={item.value} />
    );
    return (
      <div className="todo-list">
        {listItems}
      </div>
    );
  }
}

function TodoItem (props) {
  return (
    <div className="todo-item">
      <input type="checkbox" id={props.id} name={props.id} />
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
}

function AddButton () {
  return (
    <button id="addtodo" type="submit">Add</button>
  );
}
