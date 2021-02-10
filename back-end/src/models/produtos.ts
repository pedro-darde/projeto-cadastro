import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
  Sequelize,
} from "sequelize";

import { ProdutoImage } from "../models/produtoimage";

interface ProdutoAttributes {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  dataCadastro: number;
}

interface ProdutoCreationAttributes extends Optional<ProdutoAttributes, "id"> {}

export class Produtos extends Model<ProdutoAttributes, ProdutoCreationAttributes> implements ProdutoAttributes{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public quantidade!: number;
  public preco!: number;
  public dataCadastro!: number;

  public getImagens!: HasManyGetAssociationsMixin<ProdutoImage>;
  public addImagens!: HasManyAddAssociationMixin<ProdutoImage, number>;
  public hasImagens!: HasManyHasAssociationMixin<ProdutoImage, number>;

  public readonly imagens?: ProdutoImage[];

  public static associations: {
    imagens: Association<Produtos, ProdutoImage>;
  }; 
}

export const initProduto = (sequelize: Sequelize) => {
  Produtos.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quantidade: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      preco: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      dataCadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Produtos",
    }
  );

  Produtos.hasMany(ProdutoImage, {
    sourceKey: "id",
    foreignKey: "produto_id",
    as: "imagens",
  });
}
//export default { Produtos, initProduto };
