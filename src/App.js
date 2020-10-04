import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <h2>Todo</h2>
      <TodoForm/>
    </div>
  );
}

class TodoForm extends React.Component {
  constructor(props) {
    super (props);
    //this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('handleChange', event);
    //this.setState({});
  }

  // handleSubmit(event) {
  //   //this.setState({});
  //   console.log('handleSubmit', event);
  //   //let list = document.

  //   event.preventDefault();
  // } //  onSubmit={this.handleSubmit}

  render () {
    return (
      <form id="todo">
        <div className="TodoList">
          <TodoItem id="test" value="test" />
          <TodoItem id="test2" value="test2" />
        </div>
        <hr></hr>
        <input type="text" id="item" name="item" />
        <AddButton/>
        <button id="cleartodo" onClick={clearDone}>Clear done</button>
      </form>
    );
  }
}

function TodoItem(props) {
  return (
    <div className="todo-item">
      <input type="checkbox" id={props.id} name={props.id} />
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
}

function AddButton() {
  function handleClick(event) {
    console.log('add - handleClick', event);
    let entry = document.querySelector('#todo input#item');
    // convert to todo item
    // choose unique id based on timestamp
    let id = new Date().valueOf();
    let item = <TodoItem id={id} value={entry.value} />;
    console.log(id, item);
    event.preventDefault();
  }
  return (
    <button id="addtodo" onClick={handleClick}>Add</button>
  );
}

/**
 * clearDone
 * 
 * Removes checked items from todo list
 * @param {*} event 
 */
function clearDone (event) {
  // get list of todo items
  let items = document.querySelectorAll('#todo input[type="checkbox"]');
  if (items) {
    for (let i = 0; i < items.length; i++) {
      // remove todo items marked as done
      if (items[i].checked) {
        items[i].parentNode.remove();
      }
    }
  }

  event.preventDefault();
}

function addItems () {
  console.log('addItems');
  return;
}