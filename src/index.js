import DevTools from 'mobx-react-devtools';
import React from 'react';
import TodoList from './components/TodoList';
import TodoListModel from './models/TodoListModel';
import TodoModel from './models/TodoModel';

import { render } from 'react-dom';

const store = new TodoListModel();

render(
  <div>
    <DevTools />
    <TodoList store={store} />
  </div>,
  document.getElementById('root')
);

store.addTodo('Get Coffee');
store.addTodo('Write simpler code');
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo('Get a cookie as well');
}, 2000);

// playing around in the console
window.store = store;
