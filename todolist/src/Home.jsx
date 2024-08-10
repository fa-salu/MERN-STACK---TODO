import React, { useEffect, useState } from "react";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggleDone = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        // Update the local state with the new todo data
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === result.data._id ? result.data : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Update the local state by removing the deleted todo
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleToggleDone(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}

              <p>{todo.task}</p>
            </div>
            <div>
              <span onClick={() => handleDelete(todo._id)}>
                <BsFillTrashFill className="icon" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
