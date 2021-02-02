import axios from "axios";
import { FormEvent, useState } from "react";
import * as md from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "../Login/forgotPassword.css"
export default function ForgotPassword() {
  const [senha, setSenha] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmSenha, setConfirmSenha] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const notify = () => toast("Senhas não se coincidem");
  const history = useHistory();
  async function editRegister(event: FormEvent) {
    event.preventDefault();
    if (senha === confirmSenha) {
      axios
        .patch("http://localhost:3333/esqueceuSenha", {
          email: email,
          senha: senha,
        })
        .then(() => {
          history.push("/");
        });
    } else {
      setError(true);
    }
  }
  return (
    <md.Container component="main" maxWidth="xs">
      {error && <ToastContainer />}
      <form onSubmit={editRegister}>
        <md.TextField
          value={email}
          variant="outlined"
          label="Escreva seu email"
          margin="normal"
          required
          fullWidth
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          id="email"
          autoComplete="email"
          autoFocus
        />
        <md.TextField
          variant="outlined"
          margin="normal"
          label="Sua senha nova"
          required
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
          fullWidth
          name="password"
          type="password"
          id="passoword"
          autoComplete="current-password"
        />
        <md.TextField
          variant="outlined"
          margin="normal"
          required
          value={confirmSenha}
          onChange={(event) => {
            setConfirmSenha(event.target.value);
          }}
          fullWidth
          name="password"
          type="password"
          id="new-password"
          label="Confirme sua senha nova"
          autoComplete="current-password"
        />
        <md.Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={notify}
        >
          Entrar
        </md.Button>
      </form>
    </md.Container>
  );
}
