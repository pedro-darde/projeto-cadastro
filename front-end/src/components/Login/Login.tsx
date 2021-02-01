import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as md from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();
  const notify = () => toast("Usuário e ou senhas incorretos");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const url = "http://localhost:3333/login";
    axios
      .post(url, {
        email: email,
        senha: senha,
      })
      .then((res) => {
        localStorage.setItem("usuario", JSON.stringify(res.data));
        history.push("/listagemCadastro");
      })
      .catch((err) => {
        console.log("batatas " + err);
        setError(true);
      });
  }

  return (
    <md.Container component="main" maxWidth="xs">
      {error && <ToastContainer />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <md.Typography component="h1" variant="h5">
          Sign in
        </md.Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <md.TextField
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            id="passoword"
            autoComplete="email"
            autoFocus
          />
          <md.TextField
            variant="outlined"
            margin="normal"
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
          <md.FormControlLabel
            control={<md.Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
          <md.Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={notify}
          >
            Entrar
          </md.Button>
          <md.Grid container>
            <md.Grid item xs>
              <md.Link href="#" variant="body2">
                Esqueceu sua senha ?
              </md.Link>
            </md.Grid>
            <md.Grid item xs>
              <md.Link href="/formulario-cadastro" variant="body2">
                Ainda não tem uma conta ? Cadastre-se!
              </md.Link>
            </md.Grid>
          </md.Grid>
        </form>
      </div>
    </md.Container>
  );
}
