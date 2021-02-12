import {Register} from "../models/Register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as auth from "../config/auth";

class SessionControler {
  public async login(req: any, res: any) {
    try {
      let register = await Register.findOne({
        where: {
          email: req.body.email,
          senha: req.body.senha,
        },
      });

      if (register && bcrypt.compare(register.senha, req.body.senha)) {
        return res.status(200).json({
          user: {
            id: register.id,
            primeiro_nome: register.nome,
            email: register.email,
          },

          token: createToken(register.id),
        });
      }      
      return res
        .status(400)
        .json({ error: "Dados inválidos e/ou usuário inativado." });
    } catch (err){
      return res
        .status(500)
        .json({ error: "Ocorreu um erro interno no servidor" });
    }
  }
}
export function createToken(id: number, expiresIn?: string) {
  return jwt.sign({ id }, auth.default.secret, {
    expiresIn: auth.default.expiresIn,
  });
}

export default new SessionControler();
