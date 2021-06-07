import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useSelector,useDispatch } from "react-redux";
import { setTodos } from "./redux/todosSlice";
import "./App.css";

function App() {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch()
  const [filtertodos, setfilterTodos] = useState([...todos]);
  
  const [value, setvalue] = useState(" ");

  const handlefilterChange = (val) => {
    const filtertodo = filtertodos.filter((todo) => {
      switch (val) {
        case "All":
          return todo;
        case "Completed":
          return todo.isCompleted === true;
        case "Active":
          return todo.isCompleted === false;
        default:
          return todo;
      }
    });
    setTodos(filtertodo);
  };

  const clearCompletedTodo = () => {
    const newTodos = todos.filter((todo) => todo.isCompleted === false);
   dispatch(setTodos(newTodos)); 
  };

  // for items left
  var trueCount = 0;
  var falseCount = 0;
  todos.forEach((i) => {
    i.isCompleted === true ? trueCount++ : falseCount++;
  });

  return (
    <div className="App mx-auto">
      <div className="text-center " style={{ marginTop: "3%" }}>
        <h1
          style={{
            color: "#EBDBDB",
            fontFamilyL: "Helvetica",
            fontSize: "100px",
            fontWeight: "400",
          }}
         > todos
        </h1>
      </div>

      <div
        class="card mx-auto shadow-lg"
        style={{ width: "32%", backgroundColor: "#ffff" }}>
        <TodoForm />
        <ul class="list-group list-group-flush">
          <TodoList />
        </ul>

        <div className="d-flex justify-content-between ">
          <p
            className="my-3"
            style={{
              marginLeft: "3%",
              fontSize: "14px",
              color: "#4d4d4d",
              fontFamily: "sans-serif",
            }}
          > {falseCount} items left
          </p>
          <div
            class="my-2 "
            onClick={(e) => handlefilterChange(e.target.value)}
            style={{ marginRight: "-5%" }}
          >
            <button
              value="All"
              className={value === "All" ? "active" : "btnn"}
              onClick={() => setvalue("All")}
            > All
            </button>
            <button
              value="Active"
              className={value === "Active" ? "active" : "btnn"}
              onClick={() => setvalue("Active")}
            >
              Active
            </button>
            <button
              value="Completed"
              className={value === "Completed" ? "active" : "btnn"}
              onClick={() => setvalue("Completed")}
            > Completed
            </button>
          </div>
          <a
            class="nav-item nav-link btn1"
            style={{
              marginLeft: "1%",
              marginRight: "1%",
              marginTop: "1%",
              fontSize: "14px",
              color: "#4d4d4d",
              fontFamily: "sans-serif",
            }}
            onClick={clearCompletedTodo}
            href
          >
            Clear completed
          </a>
        </div>
      </div>
    </div>
  );
}
export default App;
