import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: left;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #4d225a;
  color: azure;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  margin-bottom: 5px;
`;

const todoSchema = z.object({
  value: z.string().nonempty("O título é obrigatório").max(50, "O título deve ter máximo 50 caracteres"),
  category: z.string().nonempty("Selecione uma categoria").refine(
    (val) => ["High", "Medium", "Low"].includes(val),
    "Selecione uma categoria válida"
  ),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function TodoForm({ addTodo }: { addTodo: (value: string, category: string) => void }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TodoFormData) => {
    addTodo(data.value, data.category);
    reset();
  }

  return (
    <FormContainer>
      <Title>Criar Tarefa:</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Digite o título" {...register("value")} />
        {errors.value && <Error>{errors.value.message}</Error>}

        <Select {...register("category")}>
          <option value="">Selecione o nível de prioridade da Tarefa</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        {errors.category && <Error>{errors.category.message}</Error>}

        <Button type="submit">Criar Tarefa</Button>
      </form>
    </FormContainer>
  );
}