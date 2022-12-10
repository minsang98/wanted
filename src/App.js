import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Todo = lazy(() => import("./pages/Todo"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Suspense fallback={<>...</>}>{<Login />}</Suspense>}
      />

      <Route
        path="/todo"
        element={<Suspense fallback={<>...</>}>{<Todo />}</Suspense>}
      />
    </Routes>
  );
}

export default App;
