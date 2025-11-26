import { useState } from "react";
import styled from "styled-components";
import API from "../api";

const LoginContainer = styled.div`
  background-color: #f4e1f4;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;

  input {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #4d225a;
    color: azure;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      setErro("");
      onLogin(); 
    } catch {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </LoginContainer>
  );
}
