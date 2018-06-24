import React from 'react';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoText, complete } = this.props.todo;
    const { todoIndex, listIndex, toggleComplete, deleteTodo, editingTodo } = this.props;

    return (
      <div className="todo">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => toggleComplete(listIndex, todoIndex)}
        />
        <span className="todoText">
          {todoText}
        </span>
        <button
          className="smallButton"
          onClick={() => editingTodo(listIndex, todoIndex)}
        >
          Edit
        </button>
        <button
          className="smallButton"
          onClick={() => deleteTodo(listIndex, todoIndex)}
        >
          X
        </button>

        <style jsx>
          {`
              .todo {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
              }

              .todoText {
                  margin: 0 5px 8px;
                  flex-grow: 1;
              }

              .smallButton {
                  text-align: right;
                  font-weight: bold;
                  border: none;
              }
          `}
        </style>
      </div>
    );
  }
}