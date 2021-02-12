import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
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
  dataCadastro: Date;
}

interface ProdutoCreationAttributes extends Optional<ProdutoAttributes, "id"> {}

export class Produtos
  extends Model<ProdutoAttributes, ProdutoCreationAttributes>
  implements ProdutoAttributes {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public quantidade!: number;
  public preco!: number;
  public dataCadastro: Date;

  public getImagens!: HasManyGetAssociationsMixin<ProdutoImage>;
  public addImagens!: HasManyAddAssociationMixin<ProdutoImage, number>;
  public hasImagens!: HasManyHasAssociationMixin<ProdutoImage, number>;
  public countImages!: HasManyCountAssociationsMixin;
  public createImages!: HasManyCreateAssociationMixin<ProdutoImage>;

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
};
//export default { Produtos, initProduto };
