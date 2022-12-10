import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BsCheckSquareFill, BsCheckSquare, BsPencil } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

const TodoComponent = styled.div`
  width: 100%;
  .todo {
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    input {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      font-weight: 700;
      margin: 16px;
    }
    &.done {
      span {
        color: ${({ screenMode }) => (screenMode ? "#B2B2B2" : "#B2B2B2")};
        text-decoration: line-through;
      }
    }
    .action-icons {
      font-size: 20px;
      display: flex;
      .action-icon {
        cursor: pointer;
        margin: 8px;
      }
    }
  }
  button {
    width: 50px;
    height: 25px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

function Todo({ data, deleteHandler, todosUpdateHandler }) {
  const { todo, isCompleted, id } = data;
  const [change, setChange] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);
  const inputRef = useRef();
  const changeHandler = () => {
    setChange(!change);
    if (change) {
      todosUpdateHandler(id, newTodo, false);
    }
  };
  const updateCancel = () => {
    setChange(false);
    setNewTodo(todo);
  };
  return (
    <TodoComponent>
      <div className={isCompleted ? "todo done" : "todo"}>
        <span>
          {change ? (
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              ref={inputRef}
            />
          ) : (
            todo
          )}
        </span>
        {change ? (
          <div className="action-icons">
            <button onClick={changeHandler}>수정</button>
            <button onClick={updateCancel}>취소</button>
          </div>
        ) : (
          <div className="action-icons">
            <div
              className="action-icon complete"
              onClick={() => todosUpdateHandler(id, false, true)}
            >
              {isCompleted ? <BsCheckSquareFill /> : <BsCheckSquare />}
            </div>
            <div className="action-icon" onClick={changeHandler}>
              <BsPencil />
            </div>
            <div
              className="action-icon delete"
              onClick={() => deleteHandler(id)}
            >
              <TiDeleteOutline />
            </div>
          </div>
        )}
      </div>
    </TodoComponent>
  );
}

export default Todo;
