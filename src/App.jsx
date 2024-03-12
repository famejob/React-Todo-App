import TodoList from "./Components/TodoList";
import EditTodo from "./Components/EditTodo";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/edit/:id" element={<EditTodo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
