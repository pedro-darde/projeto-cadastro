import axios from "axios";
import { useState, useEffect } from "react";
import "../Lista/style.css";
import * as icons from "react-icons/fa";
import * as md from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

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
  const [loading, setLoading] = useState<boolean>(true);
  const dateFormat = require("dateformat");
  const url = "http://localhost:3333/register";
  const history = useHistory();
  useEffect(() => {
    axios.get(url).then((response) => {
      setRegisters(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, []);

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    })
  )(md.TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })
  )(md.TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();
  if (loading) {
    return <Skeleton width={1366} height={768} />;
  }

  return (
    <div className="container" id="container-tabela">
      <div className="overflow-auto">
        <md.TableContainer component={md.Paper}>
          <md.Table aria-label="customized table" className={classes.table}>
            <md.TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Nome</StyledTableCell>
                <StyledTableCell align="right">Sobrenome</StyledTableCell>
                <StyledTableCell align="right">CPF</StyledTableCell>
                <StyledTableCell align="right">Promoção</StyledTableCell>
                <StyledTableCell align="right">Novidades</StyledTableCell>
                <StyledTableCell align="right">Data Cadastro</StyledTableCell>
                <StyledTableCell align="right" />
              </StyledTableRow>
            </md.TableHead>
            <md.TableBody>
              {registers.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.nome}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.sobrenome}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.cpf}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.promocao ? "Sim" : "Não"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.novidades ? "Sim" : "Não"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dateFormat(row.dataCadastro, "dd/mm/yyyy")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <a
                      className="btn btn-primary"
                      onClick={() => {
                        history.push(`/register/${row.id}`);
                      }}
                    >
                      {" "}
                      <icons.FaEdit />{" "}
                    </a>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </md.TableBody>
          </md.Table>
        </md.TableContainer>
      </div>
    </div>
  );
}
export default ListagemCadastro;
