import React from "react";
import styled from "styled-components";
import Todo from "./Todo";

const TodoListComponent = styled.div`
  border: 1px solid #eee;
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

function TodoList({ todos, deleteHandler, todosUpdateHandler }) {
  return (
    <TodoListComponent>
      {todos.map((v) => (
        <Todo
          data={v}
          key={v.id}
          deleteHandler={deleteHandler}
          todosUpdateHandler={todosUpdateHandler}
        />
      ))}
    </TodoListComponent>
  );
}

export default TodoList;
