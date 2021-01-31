import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as md from "@material-ui/core";
import "../Lista/style.css";
import { Link } from "react-router-dom";
import "./style.css";
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
  const[dataNascimento,setDataNascimento]=useState<Date|string>();
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
  }, []);

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
    <div className="container" id="container-cadastro">
      <label className="col-sm-2 col-form-label" id="data-cadastro">
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
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
        <md.TextField
          variant="outlined"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          value={sobrenome}
          onChange={(event) => {
            setSobrenome(event.target.value);
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
          value={cpf}
          onChange={(event) => {
            const { value } = event.target;
            event.target.value = formatCPFNumbers(value);
            setCpf(event.target.value);
          }}
        />
          <md.TextField
          variant="outlined"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
         <md.TextField
            variant="outlined"
            fullWidth={true}
            margin="normal"
            label="Data de Nascimento"
            type="date"
            value={dataNascimento?.toString}
            onChange={(event) => {
              setDataNascimento(event.target.value);
            }}
          />
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
  );
}
