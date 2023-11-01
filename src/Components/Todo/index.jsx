import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import './Todo.css';
import { v4 as uuid } from 'uuid';

import { SettingsContext } from '../../Context/SettingsContext';
import { Pagination } from '@mantine/core';

const Todo = () => {

  const settings = useContext(SettingsContext);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const defaultValues = settings?.defaultValues || {};
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList(prevList => [...prevList, item].sort((a, b) => a[settings.sortWord] - b[settings.sortWord]));
  }

  let displayList = list;
  if (settings.hideCompleted) {
    displayList = displayList.filter(item => !item.complete);
}


  const totalItems = displayList.length;
  const itemsPerPage = settings.displayItems || list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  displayList = displayList.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {totalItems} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>
        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>
        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>
        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues?.difficulty || 3} type="range" min={1} max={5} name="difficulty" />
        </label>
        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      {displayList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}

      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        size="lg"
        color="blue"
      />
    </>
  );
};

export default Todo;
