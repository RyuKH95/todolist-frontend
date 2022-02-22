import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseUrl = "http://localhost:8080/todo";
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  //TodoList 가져오기
  async function getTodos() {
    await axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //textbox 변경
  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  //insert Todo
  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
        .post(baseUrl, {
          todoName: input,
        })
        .then((response) => {
          console.log(response.data);
          setInput("");
          getTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    insertTodo();
  }

  function updateTodo(id) {
    const updateTodo = async () => {
      await axios
        .put(baseUrl + "/" + id, {})
        .then((response) => {
          // getTodos();
          //DB는 수정되니 화면에서만 바꾸기!
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };
    updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
        .delete(baseUrl + "/" + id, {})
        .then((response) => {
          // getTodos();
          //DB는 수정되니 화면에서만 바꾸기!
          setTodos(
            todos.filter((todo) => todo.id !== id)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };
    deleteTodo();
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={insertTodo}>
        <label>
          Todo &nbsp;
          <input
            type="text"
            required={true}
            value={input}
            onChange={changeText}
          />
        </label>
        <input type="submit" value="Create" />
      </form>
      <div>
        {todos
          ? todos.map((todo) => {
              return (
                <div className="todo" key={todo.id}>
                  <h3>
                    <label
                      onClick={() => updateTodo(todo.id)}
                      className={todo.completed ? "completed" : null}
                    >
                      {todo.todoName}
                    </label>
                    <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;❌</label>
                  </h3>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
