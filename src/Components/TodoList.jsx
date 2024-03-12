import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: false,
  });

  const [todosCount, setTodosCount] = useState({
    total: 0,
    completed: 0,
  });

  const updateLocalStorage = (data) => {
    localStorage.setItem("todos", JSON.stringify(data));
    setTodosCount({
      total: data.length,
      completed: data.filter((todo) => todo.status).length,
    });
  };

  useEffect(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoList(todosLocalStorage);
    setTodosCount({
      total: todosLocalStorage.length,
      completed: todosLocalStorage.filter((todo) => todo.status).length,
    });
  }, []);

  const showTodoList = async () => {
    const res = await axios.get(
      `https://65f01a15da8c6584131ac4e1.mockapi.io/todos`
    );
    setTodoList(res.data);
    updateLocalStorage(res.data);
  };

  useEffect(() => {
    showTodoList();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post(`https://65f01a15da8c6584131ac4e1.mockapi.io/todos`, todo);
    showTodoList();
    document.getElementById("todoForm").reset();
  };

  const updateStatus = async (id, status) => {
    const data = {
      status: !status,
    };
    await axios.put(
      `https://65f01a15da8c6584131ac4e1.mockapi.io/todos/${id}`,
      data
    );
    showTodoList();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `https://65f01a15da8c6584131ac4e1.mockapi.io/todos/${id}`
    );
    showTodoList();
  };

  return (
    <>
      <h1 className="text-center">TodoList</h1>
      <div className="container">
        <div>
          <form
            id="todoForm"
            onSubmit={addTodo}
            className="d-flex flex-column p-2"
          >
            <div className="mt-3">
              <input
                placeholder="ใส่ชื่อหัวข้อรายการที่ต้องทำ"
                type="text"
                name="todo"
                className="form-control"
                id="todo"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
            </div>
            <div className="mt-3">
              <textarea
                placeholder="ใส่รายละเอียดของรายการที่ต้องทำ"
                name="lorem"
                id="lorem"
                cols="120"
                rows="5"
                onChange={(e) =>
                  setTodo({ ...todo, description: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => addTodo}
                className="btn btn-success"
              >
                เพิ่ม
              </button>
            </div>
          </form>
        </div>
        <div>
          {todoList.map((item, index) => (
            <>
              <div
                className={
                  item.status
                    ? "bg-success-subtle p-3 border border-3 mt-3 rounded-3"
                    : "bg-secondary-subtle p-3 border border-3 mt-3 rounded-3"
                }
                key={index}
              >
                <h3>
                  {index + 1}.{item.title}
                </h3>
                <p>{item.description}</p>
                {item.status ? (
                  <button
                    onClick={() => updateStatus(item.id, item.status)}
                    className="btn btn-success"
                  >
                    ทำเสร็จแล้ว
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(item.id, item.status)}
                    className="btn btn-secondary"
                  >
                    ยังไม่ได้ทำ
                  </button>
                )}
                <Link to={`/edit/${item.id}`} className="btn btn-warning ms-2">
                  แก้ไข
                </Link>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="btn btn-danger ms-2"
                >
                  ลบ
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="container mt-3 d-flex">
        <div className="d-flex justify-content-center align-items-center flex-column bg-secondary-subtle border border-3 rounded-3 p-2">
          <div>จำนวนรายการที่ต้องทำ:</div>
          <div className="text-center">{todosCount.total}</div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column ms-2 bg-success-subtle border border-3 rounded-3 p-2">
          <div>จำนวนรายการที่เสร็จสิ้น:</div>
          <div className="text-center">{todosCount.completed}</div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
