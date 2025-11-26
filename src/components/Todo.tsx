import styled from "styled-components";

const TodoContainer = styled.div`
  background-color: #ffffffff;
  padding: 10px;
  box-shadow: 0 0 80px #4d225a;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  p {
    margin: 10px 0;
  }

  .category {
    font-style: italic;
  }
`;

const Button = styled.button`
  background-color: #4d225a;
  color: azure;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
`;

const RemoveButton = styled(Button)`
  background-color: #4d225a;
`;

export default function Todo({ todo, removeTodo, editTodo }: {
  todo: { id: string; text: string; category: string; isCompleted: boolean };
  removeTodo?: () => void;
  editTodo?: (newText: string, newCategory: string) => void;
}) {
  return (
    <TodoContainer>
      <Content>
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </Content>
      <div>
        <Button onClick={() => {
          const newText = prompt("Edite o título da tarefa", todo.text);
          const newCategory = prompt("Edite o status da tarefa");
          if (newText && newCategory) editTodo?.(newText, newCategory);
        }}>Editar</Button>
        <RemoveButton onClick={removeTodo}>x</RemoveButton>
      </div>
    </TodoContainer>
  );
};