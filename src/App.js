import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {
  const baseUrl = "https://rgh.synology.me:8081/todo";
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  //TodoList 가져오기
  async function getTodos() {
    console.log(baseUrl);
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
          // console.log(response.data);
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
          setTodos(todos.filter((todo) => todo.id !== id));
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
      <Input
        handleSubmit={insertTodo}
        input={input}
        handleChange={changeText}
      />
      <div>
        {todos
          ? todos.map((todo) => {
              return (
                <Todo
                  handleClick={() => updateTodo(todo.id)}
                  todo={todo}
                  handleDelete={() => deleteTodo(todo.id)}
                  key={todo.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
