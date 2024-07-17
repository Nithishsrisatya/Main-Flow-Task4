import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoList(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addNewTodo = () => {
    if (todoInput.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        task: todoInput.trim()
      };
      setTodoList([...todoList, newTodo]);
      setTodoInput("");
    } else {
      alert("Please enter a task!");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodos);
  };

  return (
    <div className="container mt-5 w-50">
      <h3 className="text-center">To-Do App using React</h3>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button onClick={addNewTodo} className="btn btn-primary">
          Add
        </button>
      </div>
      <ul className="list-group mt-4">
        {todoList.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <p>{todo.task}</p>
            <button onClick={() => deleteTodo(todo.id)} className="btn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
