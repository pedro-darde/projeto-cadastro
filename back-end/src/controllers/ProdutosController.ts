import BaseController from "./BaseController";
import { Request, Response } from "express";
import { Produtos } from "../models/produtos";

class ProdutosController extends BaseController {
  constructor() {
    super("produtos", Produtos);
  }

  public async insert(req: Request, response: Response):Promise<any> {
    let produtos = req.body as Produtos;

    Produtos.create(produtos)
      .then((user) => {
        console.log(produtos);
        return response.status(200).json(user);
      })
      .catch((err) => {
        return response.status(500).json({ err });
      });
  }
}
export default ProdutosController;
