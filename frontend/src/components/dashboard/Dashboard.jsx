import React, { useEffect, useState } from "react";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("https://crud-node-react-3.onrender.com/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      console.log("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Todo List</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;
