import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { getTodos, deleteTodo, updateTodo, createTodo } from "../api/todo";

const TodoPage = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 8rem;
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fff;
  color: #202020;
`;
const TodoContainer = styled.div`
  width: 720px;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      height: 3rem;
      display: flex;
      align-items: center;
      padding: 1rem 0;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.25rem;
    }
  }
`;

function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) navigate("/");
    else getData();
  }, []);

  const todosAddHandler = async (todo) => {
    try {
      const res = await createTodo({ todo });
      setTodos([...todos, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  const todosUpdateHandler = async (id, todo, complete) => {
    try {
      const newDatas = todos.map((v) => {
        if (v.id === id) {
          if (todo) v.todo = todo;
          if (complete) v.isCompleted = !v.isCompleted;
        }
        return v;
      });
      const newData = newDatas.filter((v) => v.id === id)[0];
      await updateTodo(id, newData);
      setTodos(newDatas);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (id) => {
    try {
      const newDatas = [...todos].filter((v) => v.id !== id);
      setTodos(newDatas);
      deleteTodo(id);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodoPage>
      <TodoContainer>
        <header>
          <h1>Todo-List</h1>
        </header>

        <TodoInput todosAddHandler={todosAddHandler} getData={getData} />
        {todos && (
          <TodoList
            todos={todos}
            deleteHandler={deleteHandler}
            todosUpdateHandler={todosUpdateHandler}
          />
        )}
      </TodoContainer>
    </TodoPage>
  );
}

export default Todo;
