import { Route, Routes } from "react-router";
import "./App.css";
import TodoEdit from "./components/todoEdit.component";
import TodoList from "./components/todolist.component";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/edit/:id" element={<TodoEdit />} />
      </Routes>
    </div>
  );
};

export default App;
