import React, { useState } from "react";
import styled from "styled-components";

const TodoInputComponent = styled.form`
  width: 100%;
  height: 64px;
  display: flex;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 24px 0;
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    font-weight: 700;
    margin: 16px;
    border: none;
    background: #fff;
    color: #202020;
  }
  button {
    all: unset;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 700;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

function TodoInput({ screenMode, todosAddHandler }) {
  const [todo, setTodo] = useState("");

  const onChangeHandler = (e) => setTodo(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    todosAddHandler(todo);
    setTodo("");
  };
  return (
    <TodoInputComponent screenMode={screenMode} onSubmit={submitHandler}>
      <input placeholder="new Todo.." onChange={onChangeHandler} value={todo} />
      <button>+</button>
    </TodoInputComponent>
  );
}

export default TodoInput;
