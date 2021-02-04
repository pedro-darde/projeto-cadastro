import Produtos from "../models/Produto";
import imagesView from './images_view'
export default {
  render(produtos: Produtos) {
    return {
      id: produtos.id,
      nome: produtos.nome,
      descricao: produtos.descricao,
      quantidade: produtos.quantidade,
      preco: produtos.preco,
      dataCadastro: produtos.dataCadastro,
      images: imagesView.renderMany(produtos.images)
    };
  },

  renderMany(produtos: Produtos[]) {
    return produtos.map(produto => this.render(produto));
  },
};
