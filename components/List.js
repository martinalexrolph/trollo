import React from 'react';
import Todo from './Todo';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props;
    const todosList = list.todos.map((todo, i) => (
      <li>
        <Todo
          todoIndex={i}
          listIndex={this.props.listIndex}
          todo={todo}
          deleteTodo={this.props.deleteTodo}
          editingTodo={this.props.editingTodo}
          toggleComplete={this.props.toggleComplete}
        />
      </li>
    ));

    return (
      <div className="list">
        <style jsx>
          {`
            .big_checkbox {
            }
          `}
        </style>
        <div className="listTitle">
          <input
            type="checkbox"
            checked={this.props.list.allComplete}
            className="big_checkbox"
            onChange={() => this.props.toggleAllComplete(this.props.listIndex)}
          />

          <h2>{list.title}</h2>
          <button
            className="deleteListButton"
            onClick={e => this.props.deleteList(this.props.listIndex)}
          >
            X
          </button>
        </div>
        <div className="listBody">
          <ul>{todosList}</ul>
        </div>
        <style jsx>
          {`
              .list {
                  display: inline;
                  max-width: 25%;
                  flex-grow: 1;
              }

              .listTitle{
                  text-align: center;
                  font-weight: bold;
                  font-size: 15px;
                  border-style: solid;
                  border-color: rgb(255, 255, 255);
                  border-width: 2px;
                  justify-content: space-between;
                  display: flex;
                  align-items: center;
                  padding: 0 4px 0 4px;
                  flex-grow: 1;
              }

              .listBody{
                  list-style-type: none;
                  justify-content: space-between;
                  display: flex;
                  align-items: center;
                  padding: 0 4px 0 4px;
                  flex-grow: 1;
                  flex-wrap: nowrap;
                  width: 100%;
                  flex-direction: column;
              }

              ul {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  list-style-type: none;
                  width: 100%;
              }
              ul{
                  padding-left: 0px;
              }
              li {
                  display: flex;
              }
              .deleteListButton{
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

export default List;
