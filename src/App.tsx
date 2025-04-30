import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then(fetchedTodos => dispatch(setTodos(fetchedTodos)));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          {!todos ? (
            <Loader />
          ) : (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
