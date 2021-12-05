import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { todoModel } from "./todolist.component";

const TodoEdit = () => {
  const { state } = useLocation();
  const todo = state?.todo as todoModel;
  const navigate = useNavigate();
  const [todoField, setTodoField] = useState<string>(todo?.name || "");
  const handleOnChangeTodoField = (value: string) => {
    setTodoField(value);
  };

  //http://localhost:3080/api/todos/${id}
  // Body like Create

  const updateTodo = async () => {
    await axios.put<todoModel>(
      `http://localhost:3080/api/todos/${todo.todoId}`,
      {
        name: todoField,
      }
    );
    navigate("/"); 
  };

  if (todo === null || todo === undefined) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <h1>Todo Edit</h1>
      <div>
        <h2>id: {todo.todoId}</h2>
      </div>
      <div>
        <input
          value={todoField}
          onChange={(e) => handleOnChangeTodoField(e.target.value)}
        />
      </div>
      <div>
        <button onClick={updateTodo}>Update</button>
      </div>
    </div>
  );
};

export default TodoEdit;
