import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as md from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as icons from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "../Login/style.css";
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
    <div id="main-div">
      <md.Container component="main" maxWidth="xs" id="container-login">
        {error && <ToastContainer />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar} id="avatar-icon">
            <LockOutlinedIcon id="icon" />
          </Avatar>
          <md.Typography component="h1" variant="h5" id="sign-in">
            Sign in
          </md.Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <md.TextField
              value={email}
              margin="normal"
              required
              label={<icons.FaUserCircle />}
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
              margin="normal"
              required
              label={<icons.FaUserSecret />}
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
            <md.FormControlLabel id="check-remember"
              control={<md.Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            />
            <md.Button
              id="button-submit"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={notify}
            >
              Entrar
            </md.Button>
            <md.Button
              id="button-create"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>{
                history.push("/formulario-cadastro")
              }}
            >
              Criar Conta
            </md.Button>
            <md.Grid container id="link">
              <md.Grid item xs>
                <md.Link href="/editPassword" variant="body2" id="link">
                  Esqueceu sua senha ?
                </md.Link>
              </md.Grid>
            </md.Grid>
          </form>
        </div>
      </md.Container>
    </div>
  );
}
