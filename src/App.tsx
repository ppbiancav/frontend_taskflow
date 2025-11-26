import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import styled from "styled-components";
import Search from "./components/Search";
import API from "./api";
import Login from "./components/Login";

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 300px;
  background-color: #cea5da;
  padding: 20px 30px;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Subtitle = styled.h2`
  text-align: left;
  margin-bottom: 10px;
`;

const TodoList = styled.div``;

export function App() {
  const [todos, setTodos] = useState<
    { id: string; text: string; category: string; isCompleted: boolean }[]
  >([]);
  const [search, setSearch] = useState("");
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token")); // verifica se token existe

  const loadTasks = async () => {
    try {
      const res = await API.get("/tarefas");
      setTodos(
        res.data.map((t: any) => ({
          id: t.id,
          text: t.titulo,
          category: t.categoria,
          isCompleted: false,
        }))
      );
    } catch (err) {
      console.log("Erro ao carregar tarefas", err);
    }
  };

  useEffect(() => {
    if (isLogged) loadTasks();
  }, [isLogged]);

  const addTodo = async (text: string, category: string) => {
    const res = await API.post("/tarefas", { titulo: text, categoria: category });
    setTodos([...todos, { id: res.data.id || Math.random().toString(), text, category, isCompleted: false }]);
  };

  const removeTodo = async (id: string) => {
    await API.delete(`/tarefas/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = async (id: string, newText: string, newCategory: string) => {
    await API.put(`/tarefas/${id}`, { titulo: newText, categoria: newCategory });
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText, category: newCategory } : todo)));
  };

  if (!isLogged) {
    return (
      <AppContainer>
        <Title>Task Flow</Title>
        <Login onLogin={() => setIsLogged(true)} />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Title>Task Flow</Title>
      <TodoForm addTodo={addTodo} />
      <Search search={search} setSearch={setSearch} />
      <Subtitle>Lista de tarefas criadas:</Subtitle>
      <TodoList>
        {todos
          .filter((todo) => todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={() => removeTodo(todo.id)}
              editTodo={(text, category) => editTodo(todo.id, text, category)}
            />
          ))}
      </TodoList>
    </AppContainer>
  );
}