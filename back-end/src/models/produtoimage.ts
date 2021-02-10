import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Produtos } from "./produtos";

interface ImageAttributes {
  id: number;
  path: string;
  produto_id: number;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

export class ProdutoImage extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public path!: string;
  public produto_id!: number;
}

export const initProdutoImage = (sequelize: Sequelize) => {
  ProdutoImage.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      produto_id: {
        allowNull: false,
        // references: {
        //   model: Produtos,
        //   key: "id",
        // },
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      sequelize,
      modelName: "ProdutoImage",
    }
  );

  ProdutoImage.belongsTo(Produtos, { targetKey: "id" })
};
//export default { ProdutoImage, initProdutoImage };
