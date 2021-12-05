import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type todoModel = {
  todoId: string;
  name: string;
  marked: boolean;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<todoModel[]>([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      const res = await axios.get<todoModel[]>(
        "http://localhost:3080/api/todos"
      );
      setTodoList(res.data);
    };

    fetchTodoList();
  }, []);

  const [todoField, setTodoField] = useState<string>("");

  const handleOnChangeTodo = (value: string) => {
    setTodoField(value);
  };

  const createTodo = async (name: string) => {
    const result = await axios.post<todoModel>(
      "http://localhost:3080/api/todos",
      {
        name,
      }
    );
    setTodoList((prev) => {
      return [...prev, result.data];
    });
    setTodoField("");
  };

  const handleOnClickAddTodo = () => {
    createTodo(todoField);
  };

  const markDone = async (id: string) => {
    await axios.put(`http://localhost:3080/api/todos/${id}/marked`);
    setTodoList((prev) => {
      return prev.map((i) => {
        if (i.todoId === id) return { ...i, marked: true };
        return i;
      });
    });
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:3080/api/todos/${id}`);
    setTodoList((prev) => {
      return prev.filter((i) => i.todoId !== id);
    });
  };

  const navigate = useNavigate();

  const handleOnClickEdit = (todo: todoModel) => {
    navigate(`/edit/${todo.todoId}`, {
      state: {
        todo,
      },
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={todoField}
          onChange={(e) => {
            handleOnChangeTodo(e.target.value);
          }}
          placeholder="Insert your todo here"
        />
        <button onClick={handleOnClickAddTodo}>Add Todo</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {todoList.map((todo) => {
          return (
            <div
              key={todo.todoId}
              style={{
                width: "800px",
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
              }}
            >
              <div>todoId: {todo.todoId}</div>
              <div>name: {todo.name}</div>
              <div>status: {todo.marked ? "Done" : "Undone"}</div>
              <div>
                <button
                  onClick={() => {
                    markDone(todo.todoId);
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    deleteTodo(todo.todoId);
                  }}
                >
                  Delete
                </button>
                <button onClick={() => {
                  handleOnClickEdit(todo)
                }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
