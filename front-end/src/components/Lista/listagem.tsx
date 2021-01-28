import axios from "axios";
import { useState, useEffect } from "react";
import '../Lista/style.css'
import * as icons from 'react-icons/fa'
import { useParams } from "react-router-dom";
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
  useEffect(() => {
    axios.get(url).then((response) => {
      setRegisters(response.data);
    });
  }, []);
  function editRegister(){
    const
    const url = `http://localhost:3333/register/${}`
    axios.get(url).then(response=>{
      setRegisters(response.data)
    })
  }
  return (
    <div className="container" id="container-tabela">
      <table className="table table-dark" id="tabela-listagem">
        <thead>
          <tr>
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
              <tr key={register.id}>
                <td>{register.id}</td>
                <td>{register.nome}</td>
                <td>{register.sobrenome}</td>
                <td>{register.cpf}</td>
                <td>{register.promocao === true ? "Sim" : "Não"}</td>
                <td>{register.novidades === true ? "Sim" : "Não"}</td>
                <td>{dateFormat(register.dataCadastro, "dd,mm,yyyy")}</td>
                <td><button className="btn btn-primary"><icons.FaEdit/></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListagemCadastro;
