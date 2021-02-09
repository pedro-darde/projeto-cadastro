import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import * as md from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import * as icons from "react-icons/fa";
interface images {
  id: number;
  url: string;
}
interface IProducts {
  id:string;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  dataCadastro: string;
  images: Array<images>;
}
function ListarProdutos() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const url = "http://localhost:3333/produtos/";
  const dateFormat = require("dateformat");
  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
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
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 640,
    },
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
    <NavBar/>
      <div className="container" id="container-tabela">
        <div className="overflow-auto">
          <md.Paper className={classes.root}>
            <md.TableContainer
              component={md.Paper}
              className={classes.container}
            >
              <md.Table
                stickyHeader
                aria-label="customized table"
                className={classes.table}
              >
                <md.TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">Nome</StyledTableCell>
                    <StyledTableCell align="left">Descrição</StyledTableCell>
                    <StyledTableCell align="right">Quantidade</StyledTableCell>
                    <StyledTableCell align="right">Preco</StyledTableCell>
                    <StyledTableCell align="right">
                      Data Cadastro
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                </md.TableHead>
                <md.TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {row.nome}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.descricao}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.quantidade}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.preco}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dateFormat(
                            row.dataCadastro,
                            "dd/mm/yyyy,h:MM:ss TT"
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                        <Link
                            to={{ pathname: `/produtos/${row.id}` }}
                            className="btn btn-primary"
                          >
                            {" "}
                            <icons.FaEdit />{" "}
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </md.TableBody>
              </md.Table>
            </md.TableContainer>
            <md.TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </md.Paper>
        </div>
      </div>
    </>
  );
}
export default ListarProdutos;
