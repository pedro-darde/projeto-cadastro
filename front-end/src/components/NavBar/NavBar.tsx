export default function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="nav-link" href="/">
        Formulario <span className="sr-only">(current)</span>
      </a>
      <a className="nav-link" href="/listagemCadastro">
        Listagem de Cadastros <span className="sr-only">(current)</span>
      </a>
    </nav>
  );
}
