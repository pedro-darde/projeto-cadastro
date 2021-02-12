import { DataTypes, Model, Sequelize } from "sequelize";

export class Register extends Model {
  public id!: number;
  public nome!: string;
  public sobrenome!: string;
  public cpf!: string;
  public dataCadastro: boolean;
  public email!: string;
  public dataNascimento!: string;
  public usuario!: string;
  public senha!: string;
}

export const initRegister = (sequelize: Sequelize) => {
  Register.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Nome inválido. Informe apenas letras.",
          },
        },
        type: DataTypes.STRING,
      },
      sobrenome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        unique: {
          name: "cpf_cnpj",
          msg: "Este CPF/CNPJ já está cadastrado.",
        },
        type: DataTypes.STRING,
      },
      dataCadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      email: {
        allowNull: false,
        unique: {
          name: "email",
          msg: "Este e-mail já está cadastrado.",
        },
        validate: {
          isEmail: {
            msg: "E-mail inválido. Informe no formato foo@bar.com.",
          },
        },
        type: DataTypes.STRING,
      },
      dataNascimento: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      usuario: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Register",
    }
  );
}
export default {Register,initRegister}