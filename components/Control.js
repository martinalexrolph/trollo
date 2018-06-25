import React from 'react';
import ListSelect from './ListSelect';

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
      newTodoText: '',
      updatedTodoText: '',
      currentList: 0,
      addingTodo: false,
    };
    this.saveTodo = this.saveTodo.bind(this);
    this.chooseList = this.chooseList.bind(this);
    this.createList = this.createList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ updatedTodoText: nextProps.oldTodoText });
  }

  saveTodo() {
    if (this.todoTextInput.value === '') {
      alert("There's nothing to add...");
    } else {
      this.props.saveTodo(this.state.currentList, this.state.newTodoText);
      this.setState({
        addingTodo: false,
        newTodoText: '',
      });
    }
  }

  createList(e) {
    e.preventDefault();
    if (this.state.newListName && this.state.newListName.length) {
      this.props.createList(this.state.newListName);
      this.setState({ newListName: '' });
      this.listNameInput.value = '';
    }
  }

  chooseList(option) {
    this.setState({
      currentList: option,
    });
  }

  render() {
    const boardLists = this.props.lists;

    const createListContent = (
      <div className="addContainer" id="add list form">
        <form>
          <input
            ref={input => {
              this.listNameInput = input;
            }}
            value={this.state.newListName}
            onChange={e => this.setState({ newListName: e.target.value })}
            type="text"
            placeholder="What should the new list be called?"
            size="50"
          />
          <label>
            <button
              className="addButton"
              id="addListButton"
              onClick={this.createList}
            >
              Add List
            </button>
          </label>
        </form>
      </div>
    );

    const editTodoContent = (
      <div className="addContainer">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.updateTodo(
              this.props.editListIndex,
              this.props.editTodoIndex,
              this.state.updatedTodoText
            );
            return false;
          }}
        >
          <input
            ref={input => {
              this.editTodoTextInput = input;
            }}
            value={this.state.updatedTodoText}
            onChange={e => this.setState({ updatedTodoText: e.target.value })}
            type="text"
            placeholder="What needs to be done?"
            size="50"
          />
          <button className="addButton">Update Todo</button>
        </form>
      </div>
    );

    return (
      <div>
        <div id="controlContainer">
          {this.props.editingTodo && editTodoContent}
          {!this.props.editingTodo && (
            <div className="addContainer">
              {!this.state.addingTodo && (
                <button
                  className="addButton"
                  onClick={e => this.setState({ addingTodo: true })}
                >
                  Get started
                </button>
              )}
              {this.state.addingTodo && (
                <ListSelect
                  lists={boardLists}
                  selectedList={this.state.currentList}
                  chooseList={this.chooseList.bind(this)}
                />
              )}
              {this.state.addingTodo &&
                this.state.currentList < boardLists.length && (
                  <div className="addContainer" id="add todo form">
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        this.saveTodo();
                        return false;
                      }}
                    >
                      <input
                        ref={input => {
                          this.todoTextInput = input;
                        }}
                        value={this.state.newTodoText}
                        onChange={e =>
                          this.setState({ newTodoText: e.target.value })
                        }
                        type="text"
                        placeholder="What needs to be done?"
                        size="50"
                      />
                      <button className="addButton">Add Todo</button>
                    </form>
                  </div>
                )}
              {this.state.addingTodo &&
                this.state.currentList > boardLists.length - 1 &&
                createListContent}
            </div>
          )}
        </div>

        <style jsx>
          {`
            #controlContainer {
              text-align: center;
              padding: 10px 0 10px 0;
              display: flex;
              align-items: center;
              justify-content: space-around;
              flex-grow: 1;
              background-color: lightgray;
              flexwrap: nowrap;
            }

            .addContainer {
              display: block;
              align-items: center;
              padding: 2px 2px 2px 2px;
              max-width: 100%;
              white-space: nowrap;
            }

            #addListButton {
              all: unset;
              color: RGB(255, 0, 90);
              border-style: solid;
              border-width: 2px;
              border-color: RGB(16, 0, 102);
              background-color: rgb(80, 227, 194);
              padding: 2px 2px 2px 2px;
              font-family: 'Lobster';
              font-weight: bold;
              text-shadow: 2px 1px RGB(16, 0, 102);
              text-align: center;
              width: 60px;
              white-space: nowrap;
              cursor: default;
            }

            .addButton {
              height: 25px;
            }

            input[type='text'] {
              padding-left: 4px;
              margin-left: 10px;
              background-color: white;
              color: rgb(16, 0, 102);
              width: 190px;
            }

            #initButtonDiv {
              text-align: center;
              margin: 50px;
              background-color: lightgray;
            }

            label {
              display: flex;
              justify-content: left;
              flex-grow: 1;
              align-items: center;
              padding: 2px 2px 2px 2px;
              max-width: 40%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Control;
