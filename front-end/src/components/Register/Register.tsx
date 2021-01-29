import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as md from "@material-ui/core";
interface IRegisters {
  nome: string;
  sobrenome: string;
  cpf: string;
  promocao: boolean;
  novidades: boolean;
  dataCadastro: Date;
}
interface RegisterParams {
  id: string;
}
export default function Register() {
  const params = useParams<RegisterParams>();
  const [register, setRegister] = useState<IRegisters>();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/register/${params.id}`)
      .then((response) => {
        setRegister(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="container" id="container-cadastro">
      <form className="form-submit">
        <md.DialogTitle>###{params.id}</md.DialogTitle>
        <md.TextField
          variant="outlined"
          fullWidth={true}
          id="input-nome"
          margin="normal"
          value={register?.nome}
        />
        <md.TextField
          variant="outlined"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          value={register?.sobrenome}
        />
        <md.TextField
          variant="outlined"
          fullWidth={true}
          id="input-cadastro"
          margin="normal"
          value={register?.cpf}
        />
        <md.FormLabel> Promoções </md.FormLabel>
        <md.Switch checked={register?.promocao} color="primary" />
        <md.FormLabel> Novidades </md.FormLabel>
        <md.Switch color="primary" checked={register?.novidades} />
      </form>
    </div>
  );
}
