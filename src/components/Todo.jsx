import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Todo = ({ todo, onFinishedClick }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => onFinishedClick(todo.id)}
    />
    {todo.title}
  </li>
);

export default Todo;
