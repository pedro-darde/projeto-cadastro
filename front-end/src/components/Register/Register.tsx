import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as md from "@material-ui/core";
import "../Lista/style.css";
import "./style.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ContactsIcon from '@material-ui/icons/Contacts';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import NavBar from "../NavBar/NavBar";
interface RegisterParams {
  id: string;
}
export default function Register() {
  const params = useParams<RegisterParams>();
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [promocao, setPromocao] = useState<boolean>(true);
  const [novidade, setNovidades] = useState<boolean>(true);
  const [dataCadastro, setDataCadastro] = useState<Date>();
  const[email,setEmail]=useState<string>("")
  const[dataNascimento,setDataNascimento]=useState<Date|null>();
  const dateFormat = require("dateformat");
  const formatCPFNumbers = (value: any) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3333/register/${params.id}`)
      .then((response) => {
        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
        setCpf(response.data.cpf);
        setPromocao(response.data.promocao);
        setNovidades(response.data.novidades);
        setDataCadastro(response.data.dataCadastro);
        setEmail(response.data.email);
        setDataNascimento(response.data.dataNascimento)
      });
  }, [params.id]);

  async function editRegister() {
    axios.patch("http://localhost:3333/register", {
      id: params.id,
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      promocao: promocao,
      novidades: novidade,
      dataCadastro: dataCadastro,
      email: email,
      dataNascimento: dataNascimento
    });
  }

  return (
    <>
    <NavBar/>
    <div className="container" id="container-cadastro">
      <label id="data-cadastro">
        Data do cadastro : {dateFormat(dataCadastro, "dd/mm/yyyy")}
      </label>
      <form className="form-submit">
        <md.DialogTitle>Editar Cadastro </md.DialogTitle>
        <md.TextField
          variant="outlined"
          fullWidth={true}
          id="input-nome"
          margin="normal"
          value={nome}
          label="Nome"
          onChange={(event) => {
            setNome(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <md.InputAdornment position="start">
                <AccountCircle />
              </md.InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <md.TextField
          variant="outlined"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          label="Sobrenome"
          value={sobrenome}
          onChange={(event) => {
            setSobrenome(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <md.InputAdornment position="start">
                <AccountCircle />
              </md.InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <md.TextField
          inputProps={{
            maxlength: 11,
          }}
          variant="outlined"
          fullWidth={true}
          id="input-cadastro"
          margin="normal"
          label="CPF"
          value={cpf}
          onChange={(event) => {
            const { value } = event.target;
            event.target.value = formatCPFNumbers(value);
            setCpf(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <md.InputAdornment position="start">
                <ContactsIcon/>
              </md.InputAdornment>
            ),
          }}
        />
          <md.TextField
          variant="outlined"
          fullWidth={true}
          label="Email Cadastro"
          margin="normal"
          id="input-cadastro"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <md.InputAdornment position="start">
                <AlternateEmailIcon/>
              </md.InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
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
        <md.FormLabel> Promoções </md.FormLabel>
        <md.Switch color="primary" checked={promocao} />
        <md.FormLabel> Novidades </md.FormLabel>
        <md.Switch color="primary" checked={novidade} />
        <a
          id="link-edit"
          href="/listagemCadastro"
          onClick={editRegister}
          className="btn btn-primary"
        >
          Confirmar Alteração
        </a>
      </form>
    </div>
    </>
  );
}
