import React, { FormEvent, useEffect, useState } from "react";
import * as md from "@material-ui/core";
import "../Formulario/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ContactsIcon from "@material-ui/icons/Contacts";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

interface IRegister {
  email: string;
  usuario: string;
}
function FormularioCadastro() {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [promocao, setPromocao] = useState<boolean>(true);
  const [novidade, setNovidades] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>();
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [register, setRegisters] = useState<IRegister[]>([]);
  const notify = () => toast("Usuario e/ou email ja cadastrados");
  const history = useHistory();
  const url = "http://localhost:3333/register";
  const formatCPFNumbers = (value: any) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  };
  
 

  function cleanFields() {
    setNome("");
    setSobrenome("");
    setCpf("");
    setEmail("");
    setUsuario("");
    setSenha("");
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      setRegisters(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      register.filter((x) => x.email === email || x.usuario === usuario)
        .length > 0
    ) {
      notify();
      return;
    } else {
      const url = "http://localhost:3333/register";
      await axios
        .post(url, {
          nome: nome,
          sobrenome: sobrenome,
          cpf: cpf,
          promocao: promocao,
          novidades: novidade,
          dataCadastro: new Date(),
          email: email,
          dataNascimento: dataNascimento,
          usuario: usuario,
          senha: senha,
        })
        .then(() => {
          history.push("/");
        });
    }
    cleanFields();
  }

  return (
    <>
      <div className="container" id="container-cadastro">
        <form className="form-submit" onSubmit={handleSubmit}>
          <md.DialogTitle id="title-form">
            {" "}
            Formulário de Cadastro{" "}
          </md.DialogTitle>
          <md.TextField
            onChange={(event) => {
              setNome(event.target.value);
            }}
            label="Esreva seu nome"
            variant="outlined"
            fullWidth={true}
            id="input-nome"
            margin="normal"
            value={nome}
            required={true}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <AccountCircle />
                </md.InputAdornment>
              ),
            }}
          />
          <md.TextField
            label="Esreva seu sobrenome"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            id="input-cadastro"
            onChange={(event) => {
              setSobrenome(event.target.value);
            }}
            value={sobrenome}
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <AccountCircle />
                </md.InputAdornment>
              ),
            }}
          />
          <md.TextField
            inputProps={{
              maxlength: 11,
            }}
            label="Escreva seu cpf"
            variant="outlined"
            fullWidth={true}
            id="input-cadastro"
            margin="normal"
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = formatCPFNumbers(value);
              setCpf(event.target.value);
            }}
            value={cpf}
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <ContactsIcon />
                </md.InputAdornment>
              ),
            }}
          />
          <md.TextField
            label="Esreva seu email"
            variant="outlined"
            type="email"
            fullWidth={true}
            margin="normal"
            id="input-cadastro"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <AlternateEmailIcon />
                </md.InputAdornment>
              ),
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              required={true}
              label="Data de nascimento"
              format="dd/MM/yyyy"
              fullWidth={true}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              value={dataNascimento}
              onChange={(event) => {
                setDataNascimento(event);
                console.log(dataNascimento);
              }}
            />
          </MuiPickersUtilsProvider>
          <md.TextField
            onChange={(event) => {
              setUsuario(event.target.value);
            }}
            label="Esreva seu usuario"
            variant="outlined"
            fullWidth={true}
            id="input-nome"
            margin="normal"
            value={usuario}
            required={true}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <AccountCircle />
                </md.InputAdornment>
              ),
            }}
          />

          <md.TextField
            fullWidth={true}
            id="standard-adornment-password"
            margin="normal"
            label="Defina sua senha"
            variant="outlined"
            type="password"
            value={senha}
            onChange={(event) => {
              setSenha(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <md.InputAdornment position="start">
                  <VpnKeyIcon />
                </md.InputAdornment>
              ),
            }}
          />
          <md.FormLabel id="forms"> Promoções </md.FormLabel>
          <md.Switch
            checked={promocao}
            color="primary"
            onChange={(event) => {
              setPromocao(event.target.checked);
            }}
            value={promocao}
          />
          <md.FormLabel id="forms"> Novidades </md.FormLabel>
          <md.Switch
            color="primary"
            checked={novidade}
            onChange={(event) => {
              setNovidades(event.target.checked);
            }}
            value={novidade}
          />

          <md.Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            className="button-submit"
          >
            {" "}
            Cadastrar{" "}
          </md.Button>

          <ToastContainer />
        </form>
      </div>
    </>
  );
}
export default FormularioCadastro;
