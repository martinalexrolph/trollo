import React from 'react';
import List from './List';
import Control from './Control';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      editingTodo: false, //selected - check if selected index
      editListIndex: '',
      editTodoIndex: '',
      oldTodoText: '',
    };
    this.addListHandler.bind(this);
    this.saveTodo.bind(this);
    this.deleteListHandler = this.deleteListHandler.bind(this);
    this.toggleTodoComplete = this.toggleTodoComplete.bind(this);
    this.toggleListComplete = this.toggleListComplete.bind(this);
    this.editingTodoHandler = this.editingTodoHandler.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  editingTodoHandler(listIndex, todoIndex) {
    const oldTodoText = this.state.lists[listIndex].todos[todoIndex].todoText;
    this.setState({
      editingTodo: true,
      editListIndex: listIndex,
      editTodoIndex: todoIndex,
      oldTodoText,
    });
  }

  updateTodo(listIndex, todoIndex, newTodoText) {
    const updatedLists = this.state.lists;
    const currentList = this.state.lists[listIndex];

    currentList.todos.splice(todoIndex, 1, {
      todoText: newTodoText,
      complete: false,
    });
    updatedLists.splice(listIndex, 1, currentList);

    this.setState({
      lists: updatedLists,
      editingTodo: false,
    });
    this.checkAllComplete(listIndex);
  }

  checkAllComplete(listIndex) {
    const currentList = this.state.lists[listIndex];
    const updatedLists = this.state.lists;

    const isComplete = (todos) => {
      for (let i = todos.length - 1; i >= 0; i--) {
        if (!todos[i].complete) return false;
      }
      return true;
    }

    updatedLists[listIndex].allComplete = isComplete(currentList.todos)

    this.setState({
      lists: updatedLists,
    });
  }

  toggleListComplete(listIndex) {
    const currentList = this.state.lists[listIndex];

    currentList.todos.forEach(todo => {
      if (currentList.allComplete) {
        todo.complete = false;
      } else {
        todo.complete = true;
      }
    });
    this.checkAllComplete(listIndex);

    // todo.complete = !currentList.allComplete;
  }

  saveTodo(listIndex, todoText) {
    const updatedLists = this.state.lists;
    const currentList = this.state.lists[listIndex];

    currentList.todos.push({ todoText, complete: false });
    updatedLists.splice(listIndex, 1, currentList);

    this.setState({
      lists: updatedLists,
    });
    this.checkAllComplete(listIndex);
  }

  deleteTodoHandler(listIndex, todoIndex) {
    const updatedLists = this.state.lists;
    const currentList = this.state.lists[listIndex];

    currentList.todos.splice(todoIndex, 1);
    updatedLists.splice(listIndex, 1, currentList);

    this.setState({ lists: updatedLists });
  }

  toggleTodoComplete(listIndex, todoIndex) {
    const updatedLists = this.state.lists;
    updatedLists[listIndex].todos[todoIndex].complete = !updatedLists[listIndex]
      .todos[todoIndex].complete;
    this.setState({
      lists: updatedLists,
    });
    this.checkAllComplete(listIndex);
  }

  addListHandler(newListTitle) {
    this.setState({
      lists: [
        ...this.state.lists,
        { title: newListTitle, todos: [], allComplete: false },
      ],
    });
  }

  deleteListHandler(listIndex) {
    const updatedLists = this.state.lists;
    updatedLists.splice(listIndex, 1);
    this.setState({ lists: updatedLists });
  }

  render() {
    const { lists } = this.state;
    const listsList = lists.map((list, i) => (
      <List
        listIndex={i}
        deleteList={this.deleteListHandler}
        list={list}
        deleteTodo={this.deleteTodoHandler.bind(this)}
        editingTodo={this.editingTodoHandler}
        toggleComplete={this.toggleTodoComplete}
        toggleAllComplete={this.toggleListComplete}
      />
    ));
    return (
      <div>
        <div className="board">
          {!listsList.length &&
            'Woot! You have nothing to do - go crack a cold one and put your feet up'}
          {listsList}
        </div>
        <div className="controlDiv">
          <div id="hackattack">
            Lists: {this.state.lists.length} | Todos:{(() => {
              let tdCount = 0;
              this.state.lists.map(l => (tdCount += l.todos.length));
              return tdCount;
            })()}
          </div>
          <Control
            lists={this.state.lists}
            saveTodo={this.saveTodo.bind(this)}
            createList={this.addListHandler.bind(this)}
            editingTodo={this.state.editingTodo}
            updateTodo={this.updateTodo}
            editingTodo={this.state.editingTodo}
            editListIndex={this.state.editListIndex}
            editTodoIndex={this.state.editTodoIndex}
            oldTodoText={this.state.oldTodoText}
          />
        </div>
        <style jsx>
          {`
            .board {
              list-style-type: none;
              display: flex;
              align-items: flex-start;
              justify-content: space-around;
              width: 100%;
              background-color: RGB(16, 0, 102);
              padding: 10px 0 10px 0;
              color: white;
            }

            p {
              cursor: default;
            }
            #hackattack {
              text-align: center;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Board;
