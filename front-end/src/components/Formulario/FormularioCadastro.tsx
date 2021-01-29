import React, { FormEvent, useEffect, useState } from "react";
import * as md from "@material-ui/core";
import "../Formulario/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FormularioCadastro() {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [promocao, setPromocao] = useState<boolean>(true);
  const [novidade, setNovidades] = useState<boolean>(true);
  const notify = () => toast("Registro incluido com sucesso!");
  const formatCPFNumbers = (value: any) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  };

  function cleanFields() {
    setNome("");
    setSobrenome("");
    setCpf("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const url = "http://localhost:3333/register";
    await axios.post(url, {
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      promocao: promocao,
      novidades: novidade,
      dataCadastro: new Date(),
    });

    cleanFields();
  }

  return (
    <>
      <div className="container" id="container-cadastro">
        <form className="form-submit" onSubmit={handleSubmit}>
          <md.DialogTitle> Formulário de Cadastro </md.DialogTitle>
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
          />
          <md.FormLabel> Promoções </md.FormLabel>
          <md.Switch
            checked={promocao}
            color="primary"
            onChange={(event) => {
              setPromocao(event.target.checked);
            }}
            value={promocao}
          />
          <md.FormLabel> Novidades </md.FormLabel>
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
            onClick={notify}
          >
            {" "}
            Cadastrar{" "}
          </md.Button>
          <ToastContainer/>
        </form>
      </div>
    </>
  );
}
export default FormularioCadastro;
