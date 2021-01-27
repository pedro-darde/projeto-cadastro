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
    };
  },

  renderMany(register : Register[]){
      return register.map(register=> this.render(register))
  }
};