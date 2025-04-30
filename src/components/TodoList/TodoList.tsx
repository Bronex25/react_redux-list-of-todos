/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todos, query, status, currentTodo] = useAppSelector((state) => [state.todos.todos, state.filter.query, state.filter.status, state.currentTodo]);

  const handleClick = (todo: Todo) => dispatch(setCurrentTodo(todo));


  const filteredTodos = useMemo(() => {
    if (!todos) {
      return;
    }

    return todos.filter(todo => {
      const titleToCheck = todo.title.toLowerCase().trim();
      const queryToCheck = query.trim().toLowerCase();
      const result = titleToCheck.includes(queryToCheck) || queryToCheck === '';

      switch (status) {
        case 'active':
          return !todo.completed && result;
        case 'completed':
          return todo.completed && result;
        default:
          return result;
      }
    });
  }, [status, query, todos]);

  return (
    <>
      {filteredTodos && filteredTodos.length === 0 ? (
        <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>

          {filteredTodos && (filteredTodos.map(todo => (
          <tr data-cy="todo" className={currentTodo?.id === todo.id ? 'has-background-info-light' : ''}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered"> 
            {todo.completed && 
                <i className="fas fa-check" data-cy="iconCompleted"/>
              }
          </td>

          <td className="is-vcentered is-expanded">
            <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
          </td>

          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button" onClick={() => handleClick(todo)}>
              <span className="icon">
                <i className={currentTodo?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'} />
              </span>
            </button>
          </td>
        </tr>
          )))}
        </tbody>
      </table>
      )}
    </>
  );
};
