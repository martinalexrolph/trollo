import React from 'react';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoText, complete } = this.props.todo;
    const { todoIndex, listIndex, toggleComplete } = this.props;
    
    return (
      <div>
        <input
          type="checkbox"
          checked={complete}
          onChange={() => toggleComplete(listIndex, todoIndex)}
        />

        {todoText}
      </div>
    );
  }
}