import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
export default function EditTodo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const showTodo = async () => {
    const res = await axios.get(
      `https://65f01a15da8c6584131ac4e1.mockapi.io/todos/${id}`
    );
    setTodo(res.data);
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, status: todo.status === "true" };
    await axios.put(
      `https://65f01a15da8c6584131ac4e1.mockapi.io/todos/${id}`,
      updatedTodo
    );
    navigate("/");
  };

  useEffect(() => {
    showTodo();
  }, []);

  return (
    <>
      <h1 className="text-center">แก้ไข Todo</h1>
      <div className="container">
        <form
          onSubmit={updateTodo}
          id="todoForm"
          className="d-flex flex-column p-2"
        >
          <div className="mt-3">
            <input
              placeholder="ใส่ชื่อหัวข้อรายการที่ต้องทำ"
              type="text"
              name="todo"
              value={todo.title}
              className="form-control"
              id="todo"
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <textarea
              placeholder="ใส่รายละเอียดของรายการที่ต้องทำ"
              name="lorem"
              value={todo.description}
              id="lorem"
              cols="120"
              rows="5"
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mt-3">
            <select
              name="status"
              value={todo.status.toString()}
              onChange={(e) => setTodo({ ...todo, status: e.target.value })}
            >
              <option value="true">ทำเสร็จแล้ว</option>
              <option value="false">ยังไม่ได้ทำ</option>
            </select>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-success">
              อัพเดต
            </button>
            <Link to={"/"} className="btn btn-dark ms-2">
              กลับ
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
