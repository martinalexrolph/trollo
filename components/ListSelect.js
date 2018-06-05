import React from 'react';

export default ({ chooseList, lists, selectedList }) => {
  const selectList = [];
  lists.map(list => selectList.push(list.title));
  selectList.push('Create new todo list');
  const optionsList = selectList.map((list, i) => (
    <option key={'lists_' + list} value={i}>
      {list}
    </option>
  ));
  return (
    <div className="selectContainer">
      <label htmlFor="listName">Add to which todo list?</label>
      <br />
      <select
        id="listName"
        onChange={e => chooseList(e.target.value)}
        value={selectedList}
      >
        {optionsList};
      </select>
      <style jsx>
        {`
          select {
            margin-left: 5px;
            color: rgb(16, 0, 102);
          }
          .selectContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};
