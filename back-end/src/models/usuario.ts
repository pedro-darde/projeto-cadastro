import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

export class Usuario extends Model {
  public id!: number;
  public primeiro_nome!: string;
  public ultimo_nome!: string;
  public ativo!: boolean;
  public email!: string;
  public senha!: string;
  public aceita_emails!: boolean;
  public telefone!: string;
  public data_dascimento!: Date;
  public cpf_cnpj!: string;

  getFullName() {
    return this.primeiro_nome + ' ' + this.ultimo_nome;
  }
}

export const initUsuario = (sequelize: Sequelize) => {
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      primeiro_nome: {
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Nome inválido. Informe apenas letras."
          }
        },
        type: DataTypes.STRING
      },
      ultimo_nome: {
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Sobrenome inválido. Informe apenas letras."
          }
        },
        type: DataTypes.STRING
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        allowNull: false,
        unique: {
          name: "email",
          msg: "Este e-mail já está cadastrado."
        },
        validate: {
          isEmail: {
            msg: "E-mail inválido. Informe no formato foo@bar.com."
          }
        },
        type: DataTypes.STRING,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING
      },
      aceita_emails: {
        allowNull: true,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      telefone: {
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Telefone inválido. Informe apenas números."
          },
        },
        type: DataTypes.STRING
      },
      data_nascimento: {
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "Data de nascimento inválida."
          },
        },
        type: DataTypes.DATEONLY
      },
      cpf_cnpj: {
        allowNull: false,
        unique: {
          name: "cpf_cnpj",
          msg: "Este CPF/CNPJ já está cadastrado."
        },
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: (usuario, options) => {
          usuario.senha = bcrypt.hashSync(usuario.senha, 16);
        }
      },
      tableName: 'usuario',
      sequelize
    }
  );
};

export default { Usuario, initUsuario };