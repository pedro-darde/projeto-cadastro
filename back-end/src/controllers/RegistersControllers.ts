import { Request, Response } from "express";
import { Register } from "../models/Register";
import BaseController from "./BaseController";


class RegisterController extends BaseController {
  constructor() {
    super("register", Register);
  }

  public async insert(req: Request, response: Response):Promise<any> {
    let register = req.body as Register;

    Register.create(register)
      .then((user) => {
        console.log(register);
        return response.status(200).json({
          id: user.id,
          nome: user.nome,
        });
      })
      .catch((err) => {
        return response.status(500).json({ err });
      });
  }

  public async list(req: Request, res: Response) : Promise<any>{
    Register.findAll().then(register =>{
      return res.json(register)
    })
    
  }
}
export default RegisterController;
