import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface RegisterParams {
  id: string;
}
export default function ForgotPassword() {
  const params = useParams<RegisterParams>();
  const [senha, setSenha] = useState<string>("");
  async function editRegister() {
    axios.patch("http://localhost:3333/register", {
      id: params.id,
      senha: senha,
    });
  }
  return <h1></h1>;
}
