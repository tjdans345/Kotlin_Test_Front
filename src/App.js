import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {
  const baseUrl = "http://localhost:9090/api/v1";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // useEffect => 앱이 처음 실행되었을 때 무엇인가를 실행하게 만들어준다.
  useEffect(() => {
    getTodos();
  }, []); // 앱이 열였을 때 딱 한번만 실행하게 하려면 두번째 인자로 빈 배열을 넣어준다.

  async function getTodos() {
    await axios
      .get(`${baseUrl}/todo`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      }); // 체이닝 메서드로 계속 연결해준다.
  }

  const insertTodo = (e) => {
    e.preventDefault();

    const inserttodo = async () => {
      await axios
        .post(`${baseUrl}/todo`, {
          todoName: input,
        })
        .then((response) => {
          console.log(response.data);
          setInput("");
          getTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    inserttodo();
  };

  const updateTodo = async (id) => {
    await axios
      .put(`${baseUrl}/todo/${id}`)
      .then((response) => {
        console.log(response.data);
        // getTodos();

        // 화면에서만 바꾸자, 디비까지 접근 할 필요 없다
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = async (id) => {
    await axios
      .delete(`${baseUrl}/todo/${id}`)
      .then((response) => {
        console.log(response.data);
        // getTodos();

        // 화면에서만 바꾸자, 디비까지 접근 할 필요 없다
        setTodos(todos.filter((todo) => todo.id !== id));
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeText = (e) => {
    e.preventDefault(); // e가 다른행동을 못하게 막아주는 코드
    setInput(e.target.value);
  };

  // return 부분이 실제 화면에 노출되는 부분
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Input
        handleSubmit={insertTodo}
        input={input}
        handleChange={changeText}
      />
        // todos 가 널이 아니면 출력 null 이면 출력x
        todos
          ? todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  handleClick={() => updateTodo(todo.id)}
                  handleDelete={() => deleteTodo(todo.id)}
                />
              );
            })
          : null
      }
    </div>
  );
}

export default App;
