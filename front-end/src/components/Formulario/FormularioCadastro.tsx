import React, { FormEvent, useEffect, useState } from "react";
import * as md from "@material-ui/core";
import "../Formulario/style.css";
import * as b from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

interface IRegisters {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  promocao: boolean;
  novidades: boolean;
  dataCadastro: Date;
}
function FormularioCadastro() {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [promocao, setPromocao] = useState<boolean>(true);
  const [novidade, setNovidades] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registers, setRegisters] = useState<IRegisters[]>([]);

  const url = "http://localhost:3333/register";
  useEffect(() => {
    axios.get(url).then((response) => {
      setRegisters(response.data);
    });
  }, []);

  function cleanFields(){
    setNome("")
    setSobrenome("")
    setCpf("")
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const url = "http://localhost:3333/register";
    const data = new FormData();
    data.append("nome", nome);
    data.append("sobrenome", sobrenome);
    data.append("cpf", cpf);
    data.append("promocao", String(promocao));
    data.append("novidades", String(novidade));
    data.append("dataCadastro", String(new Date()));
    const JSonValues = Object.fromEntries(data.entries());
    console.log(JSonValues);
    await axios.post(url, JSonValues);
    cleanFields();
    alert("Cadastro realizado com sucesso");
  }

  return (
    <>
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
          label="Escreva seu cpf"
          variant="outlined"
          fullWidth={true}
          id="input-cadastro"
          margin="normal"
          onChange={(event) => {
            setCpf(event.target.value);
          }}
          value={cpf}
          required={true}
        />
        <md.FormLabel> Promoções </md.FormLabel>
        <md.Switch
          color="primary"
          onChange={(event) => {
            setPromocao(event.target.checked);
          }}
          value={promocao}
        />
        <md.FormLabel> Novidades </md.FormLabel>
        <md.Switch
          color="primary"
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
        <md.Button
          variant="contained"
          color="primary"
          size="small"
          className="button-submit"
          onClick={handleShow}
        >
          {" "}
          Ver Cadastros{" "}
        </md.Button>
      </form>
      <b.Modal show={show} onHide={handleClose} size="lg">
        <b.Modal.Header closeButton>
          <b.Modal.Title> Cadastros Registrados </b.Modal.Title>
        </b.Modal.Header>
        <b.Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>Aceita ver promoções ?</th>
                <th>Aceita ver novidades ?</th>
                <th>Data do cadastro</th>
              </tr>
            </thead>
            <tbody>
              {registers.map((register) => {
                return (
                  <tr key={register.id}>
                    <td>{register.id}</td>
                    <td>{register.nome}</td>
                    <td>{register.sobrenome}</td>
                    <td>{register.cpf}</td>
                    <td>{register.promocao === true ? "Sim" : "Não"}</td>
                    <td>{register.novidades === true ? "Sim" : "Não"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </b.Modal.Body>
        <b.Modal.Footer></b.Modal.Footer>
      </b.Modal>
    </>
  );
}
export default FormularioCadastro;
