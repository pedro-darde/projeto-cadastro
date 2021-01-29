import axios from "axios";
import { useState, useEffect } from "react";
import "../Lista/style.css";
import * as icons from "react-icons/fa";
import { useHistory } from "react-router-dom";
interface IRegisters {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  promocao: boolean;
  novidades: boolean;
  dataCadastro: Date;
}

function ListagemCadastro() {
  const [registers, setRegisters] = useState<IRegisters[]>([]);
  const dateFormat = require("dateformat");
  const url = "http://localhost:3333/register";
  const history = useHistory();
  useEffect(() => {
    axios.get(url).then((response) => {
      setRegisters(response.data);
    });
  }, []);

  return (
    <div className="container" id="container-tabela">
      <div className="overflow-auto">
        <table
          className="table table-striped table-bordered"
          id="tabela-listagem"
        >
          <thead>
            <tr className="table-active">
              <th>ID</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>CPF</th>
              <th>Aceita ver promoções ?</th>
              <th>Aceita ver novidades ?</th>
              <th>Data do cadastro</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {registers.map((register) => {
              return (
                <tr key={register.id} className="table-active">
                  <td data-value={register.id}>{register.id}</td>
                  <td>{register.nome}</td>
                  <td>{register.sobrenome}</td>
                  <td>{register.cpf}</td>
                  <td>{register.promocao ? "Sim" : "Não"}</td>
                  <td>{register.novidades ? "Sim" : "Não"}</td>
                  <td>{dateFormat(register.dataCadastro, "dd,mm,yyyy")}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        history.push(
                          `/register/${register.id}`
                        );
                      }}
                    >
                      <icons.FaEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ListagemCadastro;
