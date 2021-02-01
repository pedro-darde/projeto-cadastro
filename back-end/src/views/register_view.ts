import Register from "../models/Register";

export default {
  render(register: Register) {
    return {
      id: register.id,
      nome: register.nome,
      sobrenome: register.sobrenome,
      cpf: register.cpf,
      promocao: register.promocao,
      novidades: register.novidades,
      dataCadastro: register.dataCadastro,
      email: register.email,
      dataNascimento: register.dataNascimento,
      usuario: register.usuario,
      senha: register.senha
    };
  },

  renderMany(register : Register[]){
      return register.map(register=> this.render(register))
  }
};
