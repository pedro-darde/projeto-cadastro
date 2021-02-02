import "../NavBar/style.css";
import { AccountCircle, AlternateEmail } from "@material-ui/icons";

import { useHistory } from "react-router-dom";
import * as b from "react-bootstrap";
import * as icons from "react-icons/fa";
import { useState } from "react";
import * as md from "@material-ui/core";
export default function NavBar() {
  const history = useHistory();
  const { user } = JSON.parse(localStorage.getItem("usuario")!);
  const [smShow, setSmShow] = useState(false);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a
              className="nav-link btn btn-outline-secondary"
              href="/listagemCadastro"
              id="home-link"
            >
              Listagem <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <b.Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <b.Modal.Header closeButton>
            <b.Modal.Title>Dados do Usuário</b.Modal.Title>
          </b.Modal.Header>
          <b.Modal.Body>
            <md.TextField
              variant="outlined"
              margin="normal"
              disabled
              value={user.id}
              InputProps={{
                startAdornment: (
                  <md.InputAdornment position="start">
                    <AccountCircle />
                  </md.InputAdornment>
                ),
              }}
            />
            <md.TextField
              variant="outlined"
              margin="normal"
              disabled
              value={user.primeiro_nome}
              InputProps={{
                startAdornment: (
                  <md.InputAdornment position="start">
                    <AccountCircle />
                  </md.InputAdornment>
                ),
              }}
            />
            <md.TextField
              variant="outlined"
              margin="normal"
              disabled
              value={user.email}
              InputProps={{
                startAdornment: (
                  <md.InputAdornment position="start">
                    <AlternateEmail />
                  </md.InputAdornment>
                ),
              }}
            />
          </b.Modal.Body>
        </b.Modal>

        <b.DropdownButton as={b.ButtonGroup} title={<icons.FaUser />}>
          <b.Dropdown.Item eventKey="1" onClick={() => setSmShow(true)}>
            {" "}
            Dados do Usuário{" "}
          </b.Dropdown.Item>
          <b.Dropdown.Item
            eventKey="1"
            onClick={() => {
              localStorage.removeItem("usuario");
              history.push("/");
            }}
          >
            {" "}
            Sair da conta{" "}
          </b.Dropdown.Item>
        </b.DropdownButton>
      </div>
    </nav>
  );
}
